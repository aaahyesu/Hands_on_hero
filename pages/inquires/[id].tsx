import type { NextPage } from "next";
import Layout from "@/components/navbar";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { Answer, Inquiry, User } from "@prisma/client";
import Textarea from "@/components/textarea";
import inquiry from "../api/inquiry";

interface AnswerWithUser extends Answer {
  user: User;
}

interface InquiryWithUser extends Inquiry {
  user: User;
  _count: {
    answer: number;
  };
  answer: AnswerWithUser[];
}

interface InquiryResponse {
  ok: boolean;
  inquiry: InquiryWithUser;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<InquiryResponse>(
    router.query.id ? `/api/inquiry/${router.query.id}` : null
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/inquiry/${router.query.id}/answers`);
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
    console.log(form);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
    }
  }, [answerData, reset]);
  return (
    <Layout hasTabBar canGoBack title="1:1 문의">
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          1:1 문의
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-lg font-medium text-gray-700">이가영</p>
            <p className="text-xs font-medium text-gray-500">프로필 보기</p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-black">Q.</span>
            {data?.inquiry?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-b-[2px]  px-4 py-2.5  text-gray-700">
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
              <span>답변 {data?.inquiry?._count?.answer}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.inquiry?.answer?.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  관리자
                </span>
                <span className="block text-xs text-gray-500 ">
                  {answer.createdAt}
                </span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <Textarea
            placeholder="궁금하신 점에 대해서 질문해주세요!"
            required
            register={register("answer", { required: true, minLength: 5 })}
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
            제출하기
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
