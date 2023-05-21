import Input from "@/components/input";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface EnterForm {
  email?: string;
  phone?: string;
}

function cls(...classnames: string[]) {
  return classnames.join(" ");
}
const Enter: NextPage = () => {
  const [submiitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  }
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  const onValid = (data:EnterForm) => {
    console.log(data);
  }
  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Hands on Hero</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm font-medium text-gray-500">
            내 손안에서 영웅을 만나보세요
          </h5>
          <div className="mt-8 grid w-full grid-cols-2 border-b ">
            <button
              className={cls(
                "border-b-2 pb-4 text-sm font-medium",
                method === "email"
                  ? " border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-400"
              )}
              onClick={onEmailClick}
            >
              이메일로 가입하기
            </button>
            <button
              className={cls(
                "border-b-2 pb-4 text-sm font-medium",
                method === "phone"
                  ? " border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-400"
              )}
              onClick={onPhoneClick}
            >
              전화번호로 가입하기
            </button>
          </div>
        </div>
        <form 
          onSubmit={handleSubmit(onValid)}
          className="mt-8 flex flex-col space-y-4">
            
          <div className="mt-1">
            {method === "email" ? (
              <Input
                register={register("email", {
                  required: true,
                })}
                name="email"
                label="Eamil address"
                type="email"
                //className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
              />
            ) : null}
            {method === "phone" ? (
                <Input
                  register={register("phone")}
                  name="phone"
                  label="Phone number"
                  type="number"
                  kind="phone"
                  //className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
            ) : null}
          </div>
          <button className="mt-5 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
            {method === "email" ? "로그인하기" : null}
            {method === "phone" ? "인증하기" : null}
          </button>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">
                또는 다른 방법으로 로그인 하기
              </span>
            </div>
          </div>
          {/* SNS 로그인 버튼 */}
          {/* <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              type="button"
              className="dark:focus:ring-[#3b5998]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/80 focus:outline-none focus:ring-2 focus:ring-[#3b5998]/50 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Facebook으로 계속하기
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#1da1f2]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#1da1f2] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#1da1f2]/80 focus:outline-none focus:ring-2 focus:ring-[#1da1f2]/50 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                ></path>
              </svg>
              트위터로 계속하기
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-white border border-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-[#4285F4]/80 focus:outline-none focus:ring-2 hover:text-white focus:ring-[#4285F4]/50 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google로 계속하기
            </button>
            <button
              type="button"
              className="mb-2 mr-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/70 dark:focus:ring-[#050708]/50 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              Sign in with Apple
            </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};
export default Enter;
