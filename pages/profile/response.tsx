import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import List from "@/components/list";
const ResponseList: NextPage = () => {
  const {data} = useSWR(`/api/users/me/responselist`);
  return (
    <Layout hasTabBar canGoBack title="수락 요청서 목록">
      <div className="flex flex-col space-y-5 py-2 px-4">
          {data?.responselists?.map((responselist) => (
            <List
              key={responselist.id}
              id={responselist.service.id}
              title={responselist.service.title}
              serviceDate={responselist.service.serviceDate}
              startTime={responselist.service.startTime}
              endTime={responselist.service.endTime}
              Cost={responselist.service.Cost}
              liked={responselist.service._count.liked}
              room={responselist.service._count.room} 
              Method={""} 
              link={`/services/${responselist.service.id}`}           />
              ))} 
        </div>
    </Layout>
  );
};

export default ResponseList;
