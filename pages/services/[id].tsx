import Layout from "@/components/Navbar";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const ServiceDetail: NextPage = () => {
  const router = useRouter();
  //console.log(router.query.id)
  const { data, error } = useSWR(
    router.query.id && `/api/services/${router.query.id}`
  );
  console.log(data);
  return (
    <Layout hasTabBar canGoBack title="요청서 상세내용">
      <div className="px-4 py-4">
        <label className="py-2 text-xl font-bold">요청자 프로필</label>
        <div className="pt-2">
          <div className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-400 py-3">
            <div className="px-4">
              <p className="text-lg font-medium text-black">김혜수</p>
              <p className="text-xs font-medium text-gray-500">프로필 보기</p>
            </div>
          </div>
          <div className="pt-4">
            <h1 className="text-xl font-bold text-gray-900">
              {data?.service.title}
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
                {data?.service?.startTime} {data?.service?.endTime}
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
            <div className="flex items-center justify-between space-x-2 pt-16">
              <button className="flex-1 rounded-md bg-black py-3 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 ">
                채팅 보내기
              </button>
              <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
