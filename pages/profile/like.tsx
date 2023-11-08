import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import { Key } from "react";
import List from "@/components/list";
import service from "./response";
import like from "../api/services/[id]/like";

const Like: NextPage = () => {
  const { data } = useSWR(`/api/users/me/likes`);
  return (
    <Layout hasTabBar canGoBack title="나의 찜목록 💘">
      <div className="flex flex-col space-y-5 px-4 py-2 pt-5">
        <Link href="/">
          {data?.liked?.map(
            (liked: {
              id: Key | null | undefined;
              service: {
                id: number;
                title: string;
                serviceDate: { toString: () => Date };
                startTime: Date;
                endTime: Date;
                Cost: number;
                _count: { liked: number; room: number };
                status: string;
              };
            }) => (
              <List
                key={liked.id}
                id={liked.service.id}
                title={liked.service.title}
                serviceDate={liked.service.serviceDate.toString()}
                startTime={liked.service.startTime}
                endTime={liked.service.endTime}
                Cost={liked.service.Cost}
                liked={liked.service._count.liked}
                room={liked.service._count.room}
                Method={""}
                link={`/services/${liked.service.id}`}
                status={liked.service.status}
              />
            )
          )}
        </Link>
      </div>
    </Layout>
  );
};

export default Like;
