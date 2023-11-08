import type { NextPage } from "next";
import Layout from "@/components/navbar";
import useSWR from "swr";
import List from "@/components/list";
import { Key } from "react";
const Service: NextPage = () => {
  const { data } = useSWR(`/api/users/me/responselist`);
  console.log(data?.responselists);
  return (
    <Layout hasTabBar canGoBack title="수락 요청서 목록">
      <div className="flex flex-col space-y-5 px-4 py-2 pt-5">
        {data?.responselists?.map(
          (service: {
            id: Key | null | undefined;
            title: string;
            serviceDate: string;
            startTime: string;
            endTime: string;
            Cost: number;
            _count: { liked: number; room: number };
            status: string;
          }) => (
            <List
              key={service.id as number}
              id={service.id as number}
              title={service.title}
              serviceDate={service.serviceDate}
              startTime={service.startTime}
              endTime={service.endTime}
              Cost={service.Cost}
              liked={service._count.liked}
              room={service._count.room}
              Method={""}
              link={`/services/${service.id}`}
              status={
                service.status as "Start" | "Complete" | "Incomplete" | "None"
              }
            />
          )
        )}
      </div>
    </Layout>
  );
};

export default Service;
