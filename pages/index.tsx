import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import useUser from "@/libs/client/useUser";
import { Service } from "@prisma/client";
import List from "@/components/list";

interface Count extends Service {
  _count: {
    liked: number;
  };
  list?: {
    kind: "Liked" | "Requestlist" | "Responselist";
  }[]
}

interface ServiceResponse {
  ok: boolean;
  services: Count[];
}
const Home: NextPage = () => {
  const {user, isLoading} = useUser();
  const { data } = useSWR<ServiceResponse>("/api/services");
  console.log(data);
  return (
    <Layout hasTabBar title="요청서 리스트">
      <div className="flex flex-col space-y-5 divide-y">
        {data?.services?.map((service) => (
          <List
            id={service.id}
            title={service.title}
            Cost={service.Cost}
            serviceDate={service.serviceDate}
            startTime={service.startTime}
            endTime={service.endTime}
            liked={service._count.liked}
            list={service.list}
          />
        ))}
        <Link href="/services/upload">
          <button className="fixed bottom-20 right-5 flex cursor-pointer justify-center rounded-full bg-blue-500 px-5 py-4 text-xl text-white shadow-xl transition-colors hover:bg-blue-400">
            <svg
              className="h-7 w-7"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            글쓰기
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
