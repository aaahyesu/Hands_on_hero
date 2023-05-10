import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useForm } from "react-hook-form";

interface UploadServiceForm {
  title:String;
  content:String;
  serviceDate:Date;
  startTime:Number;
  endTime:Number;
  Cost:Number;
}
const Upload: NextPage = () => {
  const { register, handleSubmit} = useForm<UploadServiceForm>();
  const onValid = (data:UploadServiceForm) => {
    console.log(data);
  }
  return (
    <Layout hasTabBar canGoBack title="요청서 작성">
      <div className="px-4 py-5" onSubmit={handleSubmit(onValid)}>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            서비스 제목
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <input 
              id="title"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
        </div>

        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            서비스 비용
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">\</span>
            </div>
            <input
              id="price"
              required
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="number"
              placeholder="최소 1000원"
            />
          </div>
        </div>

        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            날짜
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <input
              id="date"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="date"
            />
          </div>
        </div>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            시작 시간
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <input
              id="service_start_time"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="time"
            />
          </div>
        </div>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            종료 시간
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <input
              id="service_end_time"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="time"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            서비스 상세 내용
          </label>
          <textarea
            className="mt-1 shadow-sm w-full focus:ring-blue-500 rounded-md border-gray-500 focus:border-blue-500 "
            rows={5}
            placeholder="원하는 서비스의 상세 내용을 작성해주세요."
          />
        </div>
        <button className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none ">
          작성하기
        </button>
      </div>
    </Layout>
  );
};

export default Upload;