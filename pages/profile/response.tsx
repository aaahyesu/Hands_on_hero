import type { NextPage } from "next";
import Layout from "@/components/navbar";
import useSWR from "swr";
import List from "@/components/list";
const Service: NextPage = () => {
  const { data } = useSWR(`/api/users/me/responselist`);
  console.log(data?.responselists);
  return (
    <Layout hasTabBar canGoBack title="수락 요청서 목록">
      <div className="flex flex-col space-y-5 px-4 py-2 pt-5">
        {data?.responselists?.map((service) => (
          <List
            key={service.id}
            id={service.id}
            title={service.title}
            serviceDate={service.serviceDate.toString()}
            startTime={service.startTime.toString()}
            endTime={service.endTime.toString()}
            Cost={service.Cost}
            liked={service._count.liked}
            room={service._count.room}
            Method={""}
            link={`/services/${service.id}`}
            status={service?.status}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Service;
