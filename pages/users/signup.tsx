import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "@/components/navbar";

interface EnterForm {
  email?: string;
  password?: string;
}

function cls(...classnames: string[]) {
  return classnames.join(" ");
}
const Enter: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation("/api/user/enter");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "password" | "name">("email");
  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  }
  return (
    <Layout canGoBack title="회원가입">
      <div className="mt-16 px-4">
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-8 flex flex-col space-y-4">
          <div className="mt-1">
            <Input
              register={register("name", { required: true, })}
              name="name"
              label="이름"
              type="name"
              kind="text"
              placeholder="이름을 입력해주세요."
              required
            />
          </div>
          <div className="mt-1">
            <Input
              register={register("birthdate", { required: true, })}
              name="birthdate"
              label="생년월일"
              type="date"
              kind="birthdate"
              placeholder="생년월일을 입력해주세요."
              required
            />
          </div>
          <div className="mt-1">
            <Input
              register={register("email", { required: true, })}
              name="email"
              label="이메일 주소"
              type="email"
              kind="text"
              placeholder="이메일을 입력해주세요."
              required
            />
          </div>
          <div className="mt-1">
            <Input
              register={register("password", { required: true, })}
              name="password"
              label="비밀번호"
              type="password"
              kind="text"
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </div>
          <div className="mt-1">
            <Input
              register={register("password", { required: true, })}
              name="password"
              label="비밀번호 확인"
              type="password"
              kind="text"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" className="default:ring-2 checked:bg-blue-500"/>
            <b>약관 및 개인정보 보호 정책에 동의합니다.</b>
          </div>
          <button className="mt-5 rounded-md border border-transparent bg-black px-4 py-2 text- font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
            회원가입
          </button>
          <Link href="/users/">
            <div className="mt-5 rounded-md border-2 border-black bg-white px-4 py-2 text-center font-medium text-black shadow-sm hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              돌아가기
            </div>
          </Link>
        </form>
      </div>
    </Layout>
  );
};
export default Enter;
