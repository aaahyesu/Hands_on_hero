import type { NextPage } from "next";
import Layout from "@/components/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";
import Input from "@/components/input";
import { Service } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface UploadServiceForm {
  title: String;
  content: String;
  Method: String;
  serviceDate: Date;
  startTime: Date;
  endTime: Date;
  Cost: Number;
}

interface UploadServiceMutation {
  ok: boolean;
  service: Service;
}
const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadServiceForm>();
  const [uploadService, { loading, data }] =
    useMutation<UploadServiceMutation>("/api/services");
  const onValid = (data: UploadServiceForm) => {
    console.log(data);
    if (loading) return;
    uploadService(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/services/${data.service.id}`);
    }
  }, [data, router]);
  return (
    <Layout hasTabBar canGoBack title="요청서 작성">
      <form className="px-4" onSubmit={handleSubmit(onValid)}>
        <div className="my-4">
          <Input
            register={register("title", { required: true })}
            required
            //className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            type="text"
            placeholder="제목을 입력해주세요."
            label="제목"
            name="title"
            kind="text"
          />
        </div>

        <Input
          register={register("content", { required: true })}
          //id="content"
          required
          //className="h-24 w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
          type="text"
          label="상세 요청내용"
          placeholder="요청서 내용을 입력해주세요."
          name="content"
          kind="textArea"
        />

        <div className="my-4">
          <Input
            register={register("Method", { required: true })}
            //id="serviceMethod"
            required
            //className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            type="text"
            placeholder="화상통화, 원격접속 등 "
            label="서비스 방법을 선택해주세요."
            name="Method"
            kind="text"
          />
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
              <Input
                register={register("serviceDate", { required: true })}
                required
                type="date"
                placeholder=""
                label=""
                name="serviceDate"
                kind="time"
                //className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
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
              <Input
                register={register("startTime", { required: true })}
                required
                type="time"
                placeholder=""
                label=""
                name="startTime"
                kind="time"
                //className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <p className=" mr-4 px-4 text-sm font-semibold text-gray-700">
            종료 시간
          </p>
          <div className="relative flex items-center rounded-lg shadow-sm">
            <Input
              register={register("endTime", { required: true })}
              required
              type="time"
              placeholder=""
              label=""
              name="endTime"
              kind="time"
              //className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>
        <div className="my-4">
          <div className="">
            <Input
              register={register("Cost", { required: true })}
              required
              //className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 pl-7 shadow-sm focus:border-black focus:outline-none"
              type="number"
              placeholder=""
              label="서비스 비용을 입력해주세요."
              name="Cost"
              kind="price"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex-col-2 flex">
            <button className="mr-6 mt-2 w-full flex-1 rounded-lg border border-transparent bg-black px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-gray-700 ">
              작성하기
            </button>
            <Link href="/">
              <button className="ml-6 mt-2 w-full flex-1 rounded-lg border border-gray-600 border-transparent bg-white px-4 py-3 text-sm font-bold text-black shadow-md hover:bg-gray-300 ">
                취소하기
              </button>
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
