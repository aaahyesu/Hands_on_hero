import type { NextPage } from "next";
import Layout from "@/components/navbar";
import useSWR from "swr";
import List from "@/components/list";

const MyList: NextPage = ({}) => {
  const { data } = useSWR(`/api/users/me/requestlist`);
  console.log(data);
  return (
    <Layout hasTabBar canGoBack title="나의 요청서 목록">
      <div className="flex flex-col space-y-5 py-2">
        {data?.services?.map((service) => (
          <List
            id={service.id}
            title={service.title}
            Cost={service.Cost}
            serviceDate={service.serviceDate}
            startTime={service.startTime}
            endTime={service.endTime}
            Method={service.Method}
            liked={service._count.liked}
            room={service._count.room}
            link={`/services/${service.id}/myservice`}
          />
        ))}
      </div>
    </Layout>
  );
};

export default MyList;
