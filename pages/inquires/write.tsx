import type { NextPage } from "next";
import Layout from "@/components/Navbar";
const Write: NextPage = () => {
  return (
    <Layout hasTabBar canGoBack title="1:1 문의 작성">
      <form className="px-4 py-10">
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 "
          rows={4}
          placeholder="문의하실 내용을 적어주세요."
        />
        <button className="mt-2 w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Write;
