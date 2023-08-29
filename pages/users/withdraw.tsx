import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "@/components/navbar";

interface EnterForm {
  name?: string;
  email?: string;
  password?: string;
}

function cls(...classnames: string[]) {
  return classnames.join(" ");
}
const Enter: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태 추가

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [enter, { loading, data, error }] = useMutation("/api/user/enter");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "password" | "name">("email");
  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };
  return (
    <Layout canGoBack title="회원탈퇴">
      <h3 className="py-10 text-center text-4xl font-semibold text-black dark:text-white">
        회원 탈퇴를 위한 인증을 해주세요
      </h3>
      <div className="px-4">
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-2 flex flex-col space-y-4"
        >
          <div className="mt-1">
            <Input
              register={register("name", { required: true })}
              name="userName"
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
          <div className="mt-1">
            <Input
              register={register("password", { required: true })}
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
              register={register("password", { required: true })}
              name="password"
              label="비밀번호 확인"
              type="password"
              kind="text"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="default:ring-2 checked:bg-blue-500"
            />
            <b> 회원 탈퇴에 동의합니다.</b>
          </div>
          <button
            className="mt-5 rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 "
            onClick={openModal}
          >
            회원 탈퇴
          </button>
          {isModalOpen && (
            <div
              className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
              id="crypto-modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="relative max-h-full w-full max-w-md">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                    data-modal-hide="crypto-modal"
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                  {/* Modal body */}
                  <div className="p-6 text-center">
                    <svg
                      className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      정말 탈퇴하시겠습니까?
                    </h3>
                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      탈퇴 시 회원정보가 삭제되며 <br /> 회원정보를 복구하기
                      어렵습니다.
                    </h3>
                    {/* 하단 선택 버튼 */}
                    <div className="flex flex-col items-center space-x-1 ">
                      <nav className="flex w-full max-w-xl flex-col justify-between border-t bg-white px-4 pb-2 pt-1 text-center text-xs text-gray-800">
                        <div className="flex items-center justify-center space-x-2 rounded-b p-6 py-0  ">
                          <Link href="/enter">
                            <button
                              data-modal-hide="popup-modal"
                              type="button"
                              className="mr-2 inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-200  hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                            >
                              확인
                            </button>
                          </Link>
                          <div className="rounded-b p-6 dark:border-gray-600">
                            <Link href="/mypage">
                              <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                              >
                                취소
                              </button>
                            </Link>
                          </div>
                        </div>
                      </nav>
                    </div>
                    <ul className="my-4 space-y-3">{/* Wallet options */}</ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Link href="/mypage/">
            <div className="mt-2 rounded-md border-2 border-black bg-white px-4 py-2 text-center font-medium text-black shadow-sm hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              돌아가기
            </div>
          </Link>
        </form>
      </div>
    </Layout>
  );
};
export default Enter;
