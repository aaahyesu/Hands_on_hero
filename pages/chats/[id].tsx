import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";
import useSWR from "swr";
import Link from "next/link";

// common-component
import Button from "@/components/Button";

// component
import Message from "@/components/message";

// type
import {
  ApiResponse,
  ClientToServerEvents,
  ServerToClientEvents,
  SimpleUser,
} from "@/types/index";
import { Chat } from "@prisma/client";

// hook
import useMe from "@/libs/client/useMe";
import useSWRInfinite from "swr/infinite";
import useMutation from "@/libs/client/useMutation";
import Spinner from "@/components/spinner";
import Layout from "@/components/navbar";
import useUser from "@/libs/client/useUser";
import Service from "@/components/Service";

interface IChatWithUser extends Chat {
  User: SimpleUser;
}
interface IChatResponse extends ApiResponse {
  chats: IChatWithUser[];
  isMine: boolean;
}

interface IExitRoomResponse extends ApiResponse {}
type ChatForm = {
  chat: string;
};

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/chats/${router.query.id}`);
  const { me } = useMe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const toggleBanner = () => {
    setIsBannerOpen((prev) => !prev);
  };

  // 수락하기 -> 서비스 완료/미완료 버튼 변경
  const [isAccepted, setIsAccepted] = useState(false);

  const renderButtons = () => {
    const status = data?.room?.Service?.status;

    if (status === "None" && !isAccepted) {
      return (
        <>
          <button
            type="button"
            className="hover rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAccept}
          >
            수락하기
          </button>
          <button
            type="button"
            className="hover rounded-lg border-2 bg-white px-4 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-100"
            onClick={onExitRoom}
          >
            거절하기
          </button>
        </>
      );
    } else if (status === "Start") {
      return (
        <>
          <Link href={`/services/${data.room.Service.id}/complete`}>
            <button
              type="button"
              className="hover rounded-lg bg-green-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600"
              onClick={handleServiceComplete}
            >
              서비스 완료
            </button>
          </Link>
          <Link href={"/"}>
            <button
              type="button"
              className="hover rounded-lg bg-red-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleServiceIncomplete}
            >
              서비스 미완료
            </button>
          </Link>
        </>
      );
    }

    return null;
  };

  //서비스 수락
  const handleAccept = async () => {
    setIsAccepted(true);
    try {
      const response = await fetch(
        `/api/status/${data?.room?.id}/start`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("서비스가 수락되었습니다.");
      } else {
        toast.error("error occurred");
      }
    } catch (error) {
      console.error("API request error:", error);
      toast.error("An error occurred during the API request.");
    }
  };

  //서비스 완료
  const handleServiceComplete = async () => {
    setIsAccepted(false);
    try {
      const postResponse = await fetch(
        `/api/services/${data?.room?.serviceId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (postResponse.ok) {
        const patchResponse = await fetch(
          `/api/status/${data?.room?.serviceId}/complete`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (patchResponse.ok) {
          toast.success("서비스가 완료되었습니다.");
        } else {
          toast.error("서비스 완료 중 오류가 발생했습니다.");
        }
      } else {
        toast.error("서비스 완료 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("API request error:", error);
      toast.error("API 호출 중 오류가 발생했습니다.");
    }
  };


  //서비스 미완료
  const handleServiceIncomplete = async () => {
    setIsAccepted(false);
    try {
      const response = await fetch(
        `/api/status/${data?.room?.serviceId}/incomplete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("서비스가 미완료되었습니다.");
      } else {
        toast.error("error occurred");
      }
    } catch (error) {
      console.error("API request error:", error);
      toast.error("An error occurred during the API request.");
    }
  };

  // 채팅 폼
  const { register, handleSubmit, reset } = useForm<ChatForm>();
  // 연결한 소켓
  const [socket, setSocket] = useState<null | Socket<
    ServerToClientEvents,
    ClientToServerEvents
  >>(null);

  // 기존 채팅 load
  const [hasMoreChat, setHasMoreChat] = useState(true);
  const {
    data: chatsResponse,
    mutate: chatMutate,
    setSize,
    isValidating: loadChatsLoading,
  } = useSWRInfinite<IChatResponse>((pageIndex, prevPageData) => {
    if (!router.query.id) return;
    if (prevPageData && !prevPageData.chats.length) {
      setHasMoreChat(false);
      return null;
    }

    return `/api/chats/${router.query.id}?page=${pageIndex}&offset=${50}`;
  });

  // 채팅 스크롤 -> 가장 아래에서 실행
  useEffect(() => {
    if (chatsResponse && chatsResponse.length === 1 && !loadChatsLoading) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;
    }
  }, [chatsResponse, loadChatsLoading]);

  // 서버와 소켓 연결 + 채팅방 입장
  useEffect(() => {
    if (!me) return;

    const mySocket = io("http://localhost:3000", {
      path: "/api/chats/socketio",
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket((prev) => prev || mySocket);

    // 소켓 연결 성공 했다면
    mySocket.on("connect", () => {
      console.log("소켓 연결 성공 >> ", mySocket.id);
      // 채팅방 입장
      mySocket.emit("onJoinRoom", router.query.id as string);

      // 채팅받기 이벤트 등록
      mySocket.on("onReceive", ({ user, chat }) => {
        chatMutate(
          (prev) =>
            prev && [
              ...prev,
              {
                ok: true,
                message: "mutate로 추가",
                isMine: true,
                chats: [
                  {
                    User: user,
                    chat,
                    id: Date.now(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    roomId: +(router.query.id as string),
                    userId: user.id,
                  },
                ],
              },
            ]
        );
      });
    });
  }, [me, router, chatMutate]);

  // 채팅 전송
  const onAddChatting = useCallback(
    ({ chat }: ChatForm) => {
      console.log("chat : " + chat);
      if (!me) return;
      if (chat.trim() === "") return toast.error("내용을 입력하세요!");

      socket?.emit("onSend", {
        userId: me.id,
        roomId: router.query.id as string,
        chat,
      });

      chatMutate(
        (prev) =>
          prev && [
            ...prev,
            {
              ok: true,
              message: "mutate로 추가",
              isMine: true,
              chats: [
                {
                  User: {
                    id: me.id,
                    name: me.name,
                    // avatar: me.avatar,
                  },
                  chat,
                  id: Date.now(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  roomId: +(router.query.id as string),
                  userId: me.id,
                },
              ],
            },
          ]
      );

      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      reset();
    },
    [me, reset, router, socket, chatMutate]
  );

  //  권한 없이 채팅방 입장
  useEffect(() => {
    if (chatsResponse && !chatsResponse[0].isMine) {
      toast.error("채팅방에 접근할 권한이 없습니다.");
      router.replace("/chats");
    }
  }, [chatsResponse, router]);

  // 채팅방 나가기 메서드
  const [exitRoom, { data: exitRoomResponse, loading: exitRoomLoading }] =
    useMutation<IExitRoomResponse>(`/api/chats/room`, "DELETE");
  // 채팅방 나가기
  const onExitRoom = useCallback(async () => {
    try {
      await exitRoom({
        roomId: router.query.id,
      });
      toast.success("채팅방을 나갔습니다.");
      router.push("/chats"); // 채팅 목록 페이지로 이동
    } catch (error) {
      // 오류 처리
      console.error("채팅방 나가기 오류:", error);
      toast.error("채팅방 나가기 중 오류가 발생했습니다.");
    }
  }, [exitRoom, router]);

  // 채팅방 나가기 성공 메시지
  useEffect(() => {
    if (exitRoomResponse?.ok) {
      toast.success(exitRoomResponse.message);
      router.back();
    }
  }, [exitRoomResponse, router]);

  // 모달 스타일을 설정
  const modalStyles: React.CSSProperties = {
    position: "fixed",
    left: "50%",
    top: "80%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000, // 다른 컨텐츠 위에 나타나도록 zIndex 설정
    maxHeight: "90vh", // 모달의 최대 높이 조절
    width: "100%", // 모달의 가로 길이 설정
    maxWidth: "500px", // 모달의 최대 너비 설정 (예: 'lg' 또는 '2xl')
  };

  return (
    <Layout canGoBack hasTabBar title="채팅">
      <div
        id="banner"
        tabIndex={-1}
        className={`fixed z-50 mt-6 flex w-full max-w-xl items-start justify-between gap-8 border border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:items-center lg:py-4`}
      >
        {isBannerOpen ? (
          <div className="flex flex-col space-y-3 px-2">
            <Service
              id={data?.room?.serviceId}
              title={data?.room?.Service?.title}
              serviceDate={data?.room?.Service?.serviceDate}
              Method={data?.room?.Service?.Method}
              status={data?.room?.Service?.status}
            />
            <a
              className="text-primary-600 dark:text-primary-500 font-medium underline hover:no-underline"
              href={`/services/${data?.room?.Service?.id}`}
            >
              요청서 바로가기
            </a>{" "}
            <div className="flex items-center justify-center space-x-8">
              {renderButtons()}
            </div>
          </div>
        ) : (
          <span className="px-2 text-xl font-bold text-black">
            {data?.room?.Service?.title}
          </span>
        )}
        <button
          onClick={toggleBanner}
          className="text-gray-400 hover:text-gray-500"
        >
          {isBannerOpen ? (
            <svg
              className="h-[18px] w-[18px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.7"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
          ) : (
            <svg
              className="h-[18px] w-[18px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.7"
                d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              />
            </svg>
          )}
        </button>
      </div>

      <article className="min-h-[90vh] space-y-4 rounded-sm bg-slate-200 p-4 pt-20 mb-10">
        {loadChatsLoading && (
          <h3 className="rounded-md bg-indigo-400 p-2 text-center text-lg text-white">
            <Spinner kinds="button" />
            채팅을 불러오는 중입니다...
          </h3>
        )}
        {!hasMoreChat && (
          <li className="list-none rounded-md bg-indigo-400 py-2 text-center text-lg text-white">
            더 이상 불러올 채팅이 없습니다.
          </li>
        )}
        {chatsResponse?.[0].isMine ? (
          <ul className="space-y-2">
            {[...chatsResponse]
              .reverse()
              .map(({ chats }) =>
                chats.map((chat) => (
                  <Message
                    key={chat.id}
                    message={chat.chat}
                    user={chat.User}
                    updatedAt={chat.updatedAt}
                    $reversed={me?.id === chat.User.id}
                  />
                ))
              )}
          </ul>
        ) : (
          <>
            {!loadChatsLoading && (
              <span className="block text-center">
                현재 채팅이 없습니다. 채팅을 입력해주세요!
              </span>
            )}
          </>
        )}
      </article>
      <article>
        <div>
          <button
            onClick={openModal}
            className="fixed bottom-[90px] flex items-center justify-center rounded-md p-3 text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
          {isModalOpen && (
            <div
              style={modalStyles}
              className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
              id="crypto-modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="relative max-h-full w-full max-w-md">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                    data-modal-hide="crypto-modal"
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                  {/* Modal header */}
                  <div className="rounded-t border-b px-6 py-4 dark:border-gray-600">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
                      추가 기능
                    </h3>
                  </div>

                  {/* Modal body */}
                  <div className="space-y-6 p-6">
                    <nav className="flex w-full max-w-xl justify-between bg-white px-4 pb-5 pt-3 text-center text-xs text-gray-800">
                      <Link href="http://localhost:3001/">
                        <span className="flex flex-col items-center space-y-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>

                          <span>화상통화</span>
                        </span>
                      </Link>
                      <Link href={`/remote/${router.query.id}`}>
                        <span className="flex flex-col items-center space-y-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                            />
                          </svg>

                          <span>원격접속</span>
                        </span>
                      </Link>
                      <Link href="api/services/block">
                        <button className="flex flex-col items-center space-y-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          <span>사용자 차단</span>
                        </button>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onAddChatting)}
            className="fixed bottom-[90px] mx-12 flex w-10/12 max-w-lg justify-start rounded-md border border-black"
          >
            <input
              type="text"
              className="peer flex-[8.5] rounded-l-md placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1"
              {...register("chat")}
              autoFocus
            />
            <Button
              type="submit"
              text="전송"
              className="flex-[1.5] rounded-r-md bg-black py-[10px] text-white  hover:bg-black focus:outline-gray-500 peer-focus:ring-1"
            />
          </form>
        </div>
      </article>
    </Layout>
  );
};

export default ChatDetail;
