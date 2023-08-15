import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import List from "@/components/list";
const ResponseList: NextPage = () => {
  const {data} = useSWR(`/api/users/me/responselist`);
  return (
    <Layout hasTabBar canGoBack title="수락 요청서 목록">
      <div className="flex flex-col space-y-5 py-2">
          {data?.responselist?.map((responselist) => (
            <List
              key={responselist.id}
              id={responselist.service.id}
              title={responselist.service.title}
              serviceDate={responselist.service.serviceDate}
              startTime={responselist.service.startTime}
              endTime ={responselist.service.endTime}
              Cost={responselist.service.Cost}
              liked={responselist.service._count.liked}
            />
              ))} 
        </div>
    </Layout>
    // <Layout hasTabBar canGoBack title="나의 요청서 목록">
    //   <div className="flex flex-col space-y-5 py-2">
    //     <Link href="/">
    //       {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
    //         <div
    //           key={i}
    //           className="mt-3 flex cursor-pointer justify-between border-b px-4 pb-3 hover:bg-gray-100"
    //         >
    //           <div className="flex space-x-4">
    //             <div className="flex flex-col">
    //               <h3 className="text-sm font-medium text-gray-900">
    //                 강아지 산책하기
    //               </h3>
    //               <span className="text-xs text-gray-500">
    //                 2023년 04월 07일 12시 부터
    //               </span>
    //               <span className="text-xs text-gray-500">
    //                 2023년 04월 07일 03시 까지
    //               </span>
    //               <span className="mt-1 font-medium text-gray-900">20만원</span>
    //             </div>
    //           </div>
    //           <div className="flex items-end justify-end space-x-2">
    //             <div className="flex items-center space-x-0.5 text-sm  text-gray-600">
    //               <svg
    //                 className="h-4 w-4"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    //                 ></path>
    //               </svg>
    //               <span>1</span>
    //             </div>
    //             <div className="flex items-center space-x-0.5 text-sm  text-gray-600">
    //               <svg
    //                 className="h-4 w-4"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    //                 ></path>
    //               </svg>
    //               <span>1</span>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </Link>
    //   </div>
    // </Layout>
  );
};

export default ResponseList;
