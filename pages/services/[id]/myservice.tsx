import Layout from "@/components/navbar";
import { Service } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ApiResponse, SimpleUser } from "@/types";

interface ConnectUser extends Service {
  user: SimpleUser;
}


interface ServiceResponse extends ApiResponse {
  service: ConnectUser;
}

const MyServiceDetail: NextPage<ServiceResponse> = () => {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/services/${router.query.id}` : null
  );
    return (
    <Layout canGoBack title="요청서 상세내용">
      <div className="px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">
              {data?.service?.title}
            </h1>
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
            <div className="flex  items-center justify-center space-x-10 pt-10">
            <Link href={`/services/${data?.service?.id}/edit`}>
            <button className="rounded-md bg-black border border-black py-3 px-12 font-medium shadow-xl text-white hover:bg-gray-800 focus:outline-none">수정하기</button>
            </Link>
            <Link href={`/services/edit`}>
            <button className="rounded-md bg-white py-3 px-12 font-medium border border-gray-400 shadow-md text-black hover:bg-gray-100 focus:outline-none">삭제하기</button>
            </Link>
            </div>
          </div>
    </Layout>
  );
};

export default MyServiceDetail;
