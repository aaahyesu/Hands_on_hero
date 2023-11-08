import type { NextPage } from "next";
import Layout from "@/components/navbar";
import useSWR from "swr";
import List from "@/components/list";
import { Key } from "react";

const MyList: NextPage = ({}) => {
  const { data } = useSWR(`/api/users/me/requestlist`);
  return (
    <Layout hasTabBar canGoBack title="나의 요청서 목록">
      <div className="flex flex-col space-y-5 px-4 py-2 pt-5">
        {data?.services?.map(
          (service: {
            id: Key | null | undefined;
            title: string;
            Cost: number;
            serviceDate: string;
            startTime: string;
            endTime: string;
            Method: string;
            _count: { liked: number; room: number };
            status: string;
          }) => (
            <List
              key={service.id as number}
              id={service.id as number}
              title={service.title}
              Cost={service.Cost}
              serviceDate={service.serviceDate.toString()}
              startTime={service.startTime.toString()}
              endTime={service.endTime.toString()}
              Method={service.Method}
              liked={service._count.liked}
              room={service._count.room}
              link={`/services/${service.id}/myservice`}
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

export default MyList;
