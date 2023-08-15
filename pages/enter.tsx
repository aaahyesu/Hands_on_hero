import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface EnterForm {
  email?: string;
  password?: string;
}

function cls(...classnames: string[]) {
  return classnames.join(" ");
}
const Enter: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  const onValid = (data: EnterForm) => {
    console.log(data);
  };
  return (
    <div className="mt-16 px-4">
      <h2 className="text-center text-4xl font-extrabold">내 손안의 슈퍼맨</h2>
      <div className="mt-5">
        <div className="flex flex-col items-center">
          <img
            src="/superman_bg_transparent.png"
            alt="Superman Background"
            className="image-style "
          />
          <h5 className="text-md font-medium text-gray-500">
            내 손 안에서 슈퍼맨을 만나보세요
          </h5>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-8 flex flex-col space-y-4"
        >
          {/* <Link href="/users/login">
            <div className="mt-1 rounded-md border-2 border-transparent bg-black px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              로그인 하기
            </div>
          </Link> */}
          <Link href="/users/">
            <div className="mt-1 rounded-md border-2 border-transparent bg-black px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              로그인 / 회원가입
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Enter;
