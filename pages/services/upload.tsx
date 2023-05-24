import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface UploadServiceForm {
  title: String;
  content: String;
  serviceDate: Date;
  startTime: Number;
  endTime: Number;
  Cost: Number;
}
const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadServiceForm>();
  const onValid = (data: UploadServiceForm) => {
    console.log(data);
  };
  return (
    <Layout hasTabBar canGoBack title="요청서 작성">
      <div className="px-4" onSubmit={handleSubmit(onValid)}>
        <div className="my-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            요청서를 작성해주세요.
          </label>
          <div className="relative flex appearance-none items-center rounded-md shadow-sm">
            <input
              id="title"
              required
              className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
        </div>
        <div className="relative my-2 flex appearance-none  items-center rounded-md shadow-sm">
          <input
            id="content"
            required
            className="h-24 w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            type="text"
            placeholder="상세 내용을 입력해주세요."
          />
        </div>

        <div className="my-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            서비스 방법을 선택해주세요.
          </label>
          <div className="relative flex items-center rounded-lg shadow-sm">
            <input
              id="serviceMethod"
              required
              className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
              type="text"
              placeholder="비대면, 화상통화, 원격제어 등"
            />
          </div>
        </div>

        <div className="text my-2">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            서비스 받을 시간을 선택해주세요
          </label>
          <div className="flex items-center">
            <p className=" mr-4 px-8 text-sm font-semibold text-gray-700">
              날짜
            </p>
            <div className="relative flex items-center rounded-lg shadow-sm">
              <input
                id="date"
                required
                className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex items-center">
            <p className=" mr-4 px-4 text-sm font-semibold text-gray-700">
              시작 시간
            </p>
            <div className="relative flex items-center rounded-lg shadow-sm">
              <input
                id="startTime"
                required
                className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                type="time"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <p className=" mr-4 px-4 text-sm font-semibold text-gray-700">
            종료 시간
          </p>
          <div className="relative flex items-center rounded-lg shadow-sm">
            <input
              id="endTime"
              required
              className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
              type="time"
            />
          </div>
        </div>
        <div className="my-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            서비스 비용
          </label>
          <div className="relative flex items-center rounded-lg shadow-sm">
            <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
              <span className="text-sm text-gray-500">\</span>
            </div>
            <input
              id="cost"
              required
              className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 pl-7 shadow-sm focus:border-black focus:outline-none"
              type="number"
              placeholder="최소 1000원"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex-col-2 flex">
            <Link href="/">
              <button className="mr-6 mt-2 w-full flex-1 rounded-lg border border-transparent bg-black px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-gray-700 ">
                작성하기
              </button>
            </Link>
            <Link href="/">
              <button className="ml-6 mt-2 w-full flex-1 rounded-lg border border-gray-600 border-transparent bg-white px-4 py-3 text-sm font-bold text-black shadow-md hover:bg-gray-300 ">
                취소하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
