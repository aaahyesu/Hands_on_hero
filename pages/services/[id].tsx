import type { NextPage } from "next";

const ItemDetail: NextPage = () => {
  return (
    <div className="px-4 py-4">
      <div className="mb-8">
        <div className="h-96 bg-slate-300" />
        <div className="flex cursor-pointer items-center space-x-3 border-b border-t py-3">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-lg font-medium text-gray-700">김혜수</p>
            <p className="text-xs font-medium text-gray-500">프로필 보기</p>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">강아지 산책</h1>
          
          <div className="flex flex-col pt-5">
            <span className="text-lg text-gray-500">
              2023년 4월 1일 오전 10시 부터
            </span>
            <span className="text-lg text-gray-500">
              2023년 4월 3일 오후 12시 까지
            </span>
            <span className="mt-3 text-[23px] font-medium text-gray-900">
              200만원
            </span>
          </div>
          <p className=" my-6 text-gray-700">
            강아지 산책 좀 해주쇼..
          </p>
          <div className="flex items-center justify-between space-x-2">
            <button className="flex-1 rounded-md bg-blue-500 py-3 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
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
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          이 글과 함께 봤어요
        </h1>
        <div className=" mt-6 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i}>
              <div className="mb-4 h-56 w-full bg-slate-300" />
              <h3 className="-mb-1 text-gray-700">강아지 산책</h3>
              <span className="text-sm font-medium text-gray-900">20만원</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
