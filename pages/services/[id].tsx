import Layout from "@/components/navbar";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { cls } from "@/libs/client/utils";
import { Service, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import services from "../api/services";
import { ApiResponse } from "@/types";
import { useCallback, useEffect } from "react";
import me from "../api/users/me";
import useMe from "@/libs/client/useMe";
import { toast } from "react-toastify";
import Button from "@/components/Button";


interface ConnectUser extends Service {
  user: User;
  states: {
    kind: "Before" | "Reserved" | "End";
  }[];
}

interface ListDetail {
  ok: boolean;
  service: ConnectUser;
  liked: boolean;
}

interface IProductResponse extends ApiResponse {
  service: ConnectUser;
}

interface ICreateRoomResponse extends ApiResponse {
  roomId: number;
}

const ServiceDetail: NextPage<IProductResponse> = ( {service} ) => {
  const { user, isLoading } = useUser();
  const router = useRouter();


  const { me } = useMe();
  const states = service?.states?.map((v) => v.kind);
  // 2022/04/13 - 채팅방 생성 메서드 - by 1-blue
  const [createRoom, { data: createRoomResponse, loading: createRoomLoading }] =
    useMutation<ICreateRoomResponse>(`/api/chats/rooms`);
  // 2022/04/12 - 채팅방 생성 - by 1-blue
  const onCreateRoom = useCallback(() => {
    if (service?.userId === me?.id)
      return toast.error("본인의 상품에는 채팅을 할 수 없습니다.");
    // if (createRoomLoading)
    //   return toast.warning("채팅방을 생성중입니다.\n잠시 기다려주세요!");
    // if (states?.includes("Reserved"))
    //   return toast.warning("예약중인 상품이면 판매자와 대화할 수 없습니다.");
    // if (states?.includes("End"))
    //   return toast.warning("이미 판매한 상품이면 판매자와 대화할 수 없습니다.");
    createRoom({
      ownerId: service?.userId,
      title: service?.title,
      serviceId: service?.id,
    });
  }, [createRoom, service, me, createRoomLoading, states]);
  // 2022/04/12 - 채팅방 생성 시 채팅방으로 이동 - by 1-blue
  useEffect(() => {
    if (!createRoomResponse?.ok) return;
    toast.success("채팅방으로 이동합니다.");
    router.push(`/chats/${createRoomResponse.roomId}`);
  }, [router, createRoomResponse]);



  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ListDetail>(
    router.query.id ? `/api/services/${router.query.id}` : null
  );
  const [togglelike] = useMutation(`/api/services/${router.query.id}/like`);
  const onLikeClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, liked: !prev.liked }, false);
    togglelike({});
  };
  console.log(data);
  return (
    <Layout hasTabBar canGoBack title="요청서 상세내용">
      <div className="px-4 py-4">
        <label className="py-2 text-xl font-bold">요청자 프로필</label>
        <div className="pt-2">
          <Link href={`/profile/`}>
          <div className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-400 py-3">
            <div className="px-4">
              <p className="text-lg font-medium text-black">{data?.service.user?.name}</p>
              <p className="text-xs font-medium text-gray-500">프로필 보기</p>
            </div>
          </div>
          </Link>
          <div className="pt-4">
            <h1 className="text-xl font-bold text-gray-900">{data?.service?.title}</h1>
            <div className="flex flex-col pt-2" />
            <div className="flex items-center space-x-3 rounded-lg border border-gray-400 py-10">
              <span className="px-4 text-sm text-black">
                {data?.service?.content}
              </span>
            </div>
            <div className="pt-4" />
            <div className="flex flex-col space-x-3 rounded-lg border border-gray-400 py-2">
              <p className="mb-2 px-4 text-xl font-bold">요청시간</p>
              <span className="px-2 text-sm text-black">
                {data?.service?.startTime} ~ {data?.service?.endTime}
              </span>
            </div>
            <div className="pt-4" />
            <div className="flex flex-col space-x-3 rounded-lg border border-gray-400 py-2">
              <p className="mb-2 px-4 text-xl font-bold">서비스 비용</p>
              <span className="px-2 text-sm text-black">
                {data?.service?.Cost}
              </span>
            </div>
            <div className="pt-4" />
            <div className="flex flex-col space-x-3 rounded-lg border border-gray-400 py-2">
              <p className="mb-2 px-4 text-xl font-bold">서비스 방법</p>
              <span className="px-2 text-sm text-black">
                {data?.service?.Method}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-2 pt-16">
            <Button
              text="판매자와 대화하기"
              type="button"
              className="flex-1"
              $primary
              onClick={onCreateRoom}
              $loading={createRoomLoading}
            />
              {/* <button className="flex-1 rounded-md bg-black py-3 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 ">
                채팅 보내기
              </button> */}
              <button
              onClick={onLikeClick} 
              className= {cls("flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500",
              data?.liked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-500")}>
              {data?.liked ? (
                <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 23 23"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
                ) : (
                  <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
