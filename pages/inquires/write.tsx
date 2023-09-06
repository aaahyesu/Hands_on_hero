import type { NextPage } from "next";
import Layout from "@/components/navbar";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TextArea from "@/components/textarea";
import { Inquiry } from "@prisma/client";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  inquiry: Inquiry;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [uploadinquiry, { loading, data }] =
    useMutation<WriteResponse>("/api/inquiry");
  const onValid = (data: WriteForm) => {
    console.log(data);
    if (loading) return;
    uploadinquiry(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/inquires/${data.inquiry.id}`);
    }
  }, [data, router]);

  return (
    <Layout hasTabBar canGoBack title="1:1 문의 작성">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="문의하실 내용을 적어주세요"
          name="quesiton"
        />
        <button className="mt-2 w-full rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Write;
