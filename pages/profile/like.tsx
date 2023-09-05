import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import { Key } from "react";
import List from "@/components/list";

const Like: NextPage = () => {
  const { data } = useSWR(`/api/users/me/likes`);
  return (
    <Layout hasTabBar canGoBack title="나의 찜목록 💘">
      <div className="flex flex-col space-y-5 px-4 py-2">
        <Link href="/">
          {data?.liked?.map((liked) => (
            <List
              key={liked.id}
              id={liked.service.id}
              title={liked.service.title}
              serviceDate={liked.service.serviceDate}
              startTime={liked.service.startTime}
              endTime={liked.service.endTime}
              Cost={liked.service.Cost}
              liked={liked.service._count.liked}
              room={liked.service._count.room}
              Method={""}
              link={`/services/${liked.service.id}`}
            />
          ))}
        </Link>
      </div>
    </Layout>
  );
};

export default Like;
