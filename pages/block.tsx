import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";

const Block: NextPage = () => {
  return (
    <Layout hasTabBar canGoBack title="⛔️ 사용자 차단 목록 ⛔️">
      {[1].map((_, i) => (
        <div key={i} className="border-b px-4">
          <div className="flex items-center space-x-3 rounded-lg px-3 py-3">
            <div className="h-12 w-12 rounded-full bg-gray-500">
              <img
                src="/superman_bg_white.png"
                alt="Avatar"
                className="h-full w-full rounded-full shadow-md"
              />{" "}
            </div>
            <div className="flex-col-2 flex px-4">
              <span className="text-md font-bold text-gray-900">우가우가</span>
            </div>
            <div className="flex flex-grow justify-end"></div>
            <button className="rounded-lg bg-black px-4 py-2 text-sm text-white shadow-sm">
              차단해제
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
};
export default Block;
