import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import Layout from "@/components/navbar";
import { cls } from "libs/client/utils";

// common-components
import Spinner from "components/spinner";
// import Avatar from "@/components/Avatar";

// type
import { ApiResponse, SimpleUser } from "@/types";
import { Room } from "@prisma/client";

// util
import { timeFormat } from "libs/client/dateFormat";

interface IRoomWithUser extends Room {
  users: SimpleUser[];
}
interface IResponseRooms extends ApiResponse {
  rooms: IRoomWithUser[];
  roomsOfLastChat: {
    roomId: number;
    chat: string;
    updatedAt: Date;
  }[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<IResponseRooms>("/api/chats/room");

  if (!data) return <Spinner kinds="page" />;

  return (
    <Layout canGoBack title="채팅방 💬">
      <article className="divide-y-[1px]">
        <div />
        {data.rooms.length > 0 ? (
          data.rooms.map((room, index) => (
            <Link key={room.id} href={`/chats/${room.id}`}>
              <p className="flex cursor-pointer items-center space-x-3 rounded-md px-4 py-3 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
                <div
                  className={cls(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full  bg-black", // 동그란 원 스타일
                    "mr-1" // 오른쪽 여백
                  )}
                >
                  <img
                    src="/superman_bg_white.png"
                    alt="Avatar"
                    className="h-full w-full rounded-full shadow-md"
                  />
                </div>
                {/* <Avatar user={room.users[0]} /> */}
                <div>
                  <p className="text-base font-semibold text-gray-700">
                    {room?.users[0]?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.roomsOfLastChat?.[index].chat
                      ? data?.roomsOfLastChat?.[index].chat
                      : "아직 입력된 채팅이 없습니다."}
                  </p>
                </div>
                <div className="flex-1" />
                <span className="self-start text-xs text-gray-500">
                  {timeFormat(data.roomsOfLastChat?.[index].updatedAt)}
                </span>
              </p>
            </Link>
          ))
        ) : (
          <h4 className="py-8 text-center text-2xl font-medium text-gray-500">
            채팅방이 없습니다.
          </h4>
        )}
        <div />
      </article>
    </Layout>
  );
};

export default Chats;
