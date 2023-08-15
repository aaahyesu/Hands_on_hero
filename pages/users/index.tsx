import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EnterForm {
  email?: string;
  password?: string;
  name?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

function cls(...classnames: string[]) {
  return classnames.join(" ");
}
const Enter: NextPage = () => {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/enter");
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const { register, handleSubmit } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  console.log(data);
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);
  return (
    <div className="mt-16 px-4">
      <h2 className="text-center text-4xl font-extrabold">내 손안의 슈퍼맨</h2>
      <div className="mt-12">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col space-y-4"
          >
            <img
              src="/superman_id_white.png" // Path to your image in the public directory
              alt="Superman Background"
              className="image-size mx-auto" // Apply the .image-style class here
            />
            <Input
              register={tokenRegister("token", { required: true })}
              name="token"
              label="인증번호를 입력해주세요"
              type="text"
              kind="text"
              required
              placeholder={""}
            />

            <button className="text- mt-5 rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              확인
            </button>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h5 className="text-md font-medium text-gray-500">
                내 손 안에서 슈퍼맨을 만나보세요
              </h5>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col space-y-4"
            >
              <div className="mt-1">
                <Input
                  register={register("name", { required: true })}
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
                  register={register("email", { required: true })}
                  name="email"
                  label="이메일 주소"
                  type="email"
                  kind="text"
                  placeholder="이메일을 입력해주세요."
                  required
                />
              </div>
              {/* <div className="mt-1">
              <Input
                register={register("password", {required: true,})}
                name="password"
                label="비밀번호"
                type="password"
                kind="text"
                placeholder="비밀번호를 입력해주세요."
                required          
              />
            </div> */}

              <button className="text- mt-5 rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
                로그인
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Enter;
