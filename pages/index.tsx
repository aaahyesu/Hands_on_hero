import type { NextPage } from "next";
import Layout from "@/components/layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout hasTabBar title="요청서 리스트">
      <div className="flex flex-col space-y-5 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href="\services\1">
            <div
              key={i}
              className="flex px-4 border-b pb-3 cursor-pointer hover:bg-gray-200 justify-between"
            >
              <div className="flex space-x-3">
                <div className="pt-5 flex flex-col">
                  <h3 className="text-[25px] font-bold mb-3 text-black">
                    강아지 산책
                  </h3>
                  <span className="text-lg text-gray-500">2023년 4월 1일 오전 10시 부터</span>
                  <span className="text-lg text-gray-500">2023년 4월 3일 오후 12시 까지</span>
                  <span className="text-[20px] font-medium mt-3 text-gray-900">200만원</span>
                </div>
              </div>
              <div className="flex space-x-2 items-end justify-end">
                <div className="flex space-x-0.5 items-center text-5  text-gray-600">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span>1</span>
                </div>
                <div className="flex space-x-0.5 items-center text-5  text-gray-600">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>1</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Link href="\services\upload">
        <button className="flex justify-center fixed hover:bg-blue-400 transition-colors cursor-pointer bottom-20 right-5 shadow-xl bg-blue-500 rounded-full px-5 py-4 text-xl text-white">
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