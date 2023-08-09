import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";

// common-component
import Button from "@/components/button";

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
import Spinner from "@/components/spinner";

interface IChatWithUser extends Chat {
  User: SimpleUser;
}
interface IChatResponse extends ApiResponse {
  chats: IChatWithUser[];
  isMine: boolean;
}
type ChatForm = {
  chat: string;
};

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { me } = useMe();

  const { register, handleSubmit, reset } = useForm<ChatForm>();
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
      path: "/chats/socketio",
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket((prev) => prev || mySocket);

    // 소켓 연결 성공 했다면
    mySocket.on("connect", () => {
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
      if (!me) return;
      if (chat.trim() === "") return toast.error("내용을 입력하세요!");
      if (chat.length > 200)
        return toast.error(
          `200자 이내로 입력해주세요( 현재 ${chat.length}자 )`
        );

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
  // // 무한 스크롤링 이벤트 함수
  // const infiniteScrollEvent = useCallback(() => {
  //   if (window.scrollY <= 200 && hasMoreChat && !loadChatsLoading) {
  //     setSize((prev) => prev + 1);
  //   }
  // }, [hasMoreChat, loadChatsLoading, setSize]);
  // 무한 스크롤링 이벤트 등록/해제
  // useEffect(() => {
  //   window.addEventListener("scroll", infiniteScrollEvent);

  //   return () => window.removeEventListener("scroll", infiniteScrollEvent);
  // }, [infiniteScrollEvent]);

  //  권한 없이 채팅방 입장
  useEffect(() => {
    if (chatsResponse && !chatsResponse[0].isMine) {
      toast.error("채팅방에 접근할 권한이 없습니다.");
      router.replace("/chats");
    }
  }, [chatsResponse, router]);

  return (
    <>
      <article className="mb-[10vh] min-h-[70vh] space-y-4 rounded-sm bg-slate-200 p-4">
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
        <form
          onSubmit={handleSubmit(onAddChatting)}
          className="fixed inset-x-0 bottom-24 mx-auto flex w-10/12 max-w-lg"
        >
          <input
            type="text"
            className="peer flex-[8.5] rounded-l-md border-gray-300 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-black"
            {...register("chat")}
            autoFocus
          />
          <Button
            type="submit"
            text="전송"
            className="flex-[1.5] rounded-r-md bg-black py-[10px] text-white ring-blue-400 hover:bg-black focus:outline-orange-500 peer-focus:ring-1"
          />
        </form>
      </article>
    </>
  );
};

export default ChatDetail;
