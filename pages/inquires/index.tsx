import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import { Inquiry, User } from "@prisma/client";
import useSWR from "swr";

interface InquiryWithUser extends Inquiry {
  user: User;
  _count: {
    answer: number;
  };
}

interface InquiryResponse {
  ok: boolean;
  inquiries: InquiryWithUser[];
}

const Inquirys: NextPage = () => {
  const { data } = useSWR<InquiryResponse>(
    typeof window === "undefined" ? null : `/api/inquiry`
  );
  return (
    <Layout hasTabBar canGoBack title="문의 내역">
      <div className="mt-5 space-y-5">
        {data?.inquiries?.map((inquiry) => (
          <Link key={inquiry.id} href={`/inquires/${inquiry.id}`}>
            <div
              key={inquiry.id}
              className="flex cursor-pointer flex-col items-start pt-4 hover:bg-gray-200"
            >
              <span className="ml-4 flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                1:1 문의
              </span>
              <div className="mt-4 px-4 text-gray-700">
                <span className="font-medium text-black">Q.</span>{" "}
                {inquiry.question}
              </div>
              <div className="mt-5 flex w-full items-center justify-between px-4 text-xs font-medium text-gray-500">
                <span>{inquiry?.user?.name}</span>
              </div>
              <div className="mt-6 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
                <span className="flex items-center space-x-2 text-sm">
                  <svg
                    className="h-4 w-4"
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
                  <span>답변 {inquiry._count.answer}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        <Link href="/inquires/write">
          <button className="fixed bottom-20 right-5 cursor-pointer rounded-full bg-black p-4 text-white shadow-xl transition-colors hover:bg-gray-400">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Inquirys;
