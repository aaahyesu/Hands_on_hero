import type { NextPage } from "next";
import Layout from "@/components/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";
import Input from "@/components/input";
import { Service } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import TextArea from "@/components/textarea";

interface EditServiceForm {
  title: String;
  content: String;
  Method: String;
  serviceDate: Date;
  startTime: Date;
  endTime: Date;
  Cost: Number;
  formErrors?: string;
}

interface EditServiceResponse {
  ok: boolean;
  service: Service;
  error?: string;
}
const Update: NextPage = () => {
  const router = useRouter();
  const { register, setValue, handleSubmit, setError } = useForm<EditServiceForm>();
  const [editService, { loading, data }] =
    useMutation<EditServiceResponse>(`/api/services/${router.query.id}/edit`);
  useEffect(() => {
    if(data?.service?.title) setValue("title", data?.service?.title);
    if(data?.service?.content) setValue("content", data?.service?.content);
    if(data?.service?.Method) setValue("Method", data?.service?.Method);
    if(data?.service?.Cost) setValue("Cost", data?.service?.Cost);
    if(data?.service?.serviceDate) setValue("serviceDate", data?.service?.serviceDate);
    if(data?.service?.startTime) setValue("startTime", data?.service?.startTime);
    if(data?.service?.endTime) setValue("endTime", data?.service?.endTime);
  }, [data, setValue]);
  const onValid = ({title, content, Method, Cost, serviceDate, startTime, endTime}: EditServiceForm) => {
    if(title === "" && content === "" && Method === "" && Cost === null && serviceDate === null && startTime === null && endTime === null) {
      return setError("formErrors",{message:"수정할 내용을 입력해주세요."});
    }
    editService({title, content, Method, Cost: +Cost, serviceDate, startTime, endTime})
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/services/${router.query.id}/myservice`);
    }
  }, [data, router]);

  return (
    <Layout hasTabBar canGoBack title="요청서 수정">
      <form className="px-4" onSubmit={handleSubmit(onValid)}>
        <div className="my-4">
          <Input
            register={register("title")}
            required
            type="text"
            placeholder="제목을 입력해주세요."
            label="제목"
            name="title"
            kind="text"
          />
        </div>

        <TextArea
          register={register("content")}
          required
          label="상세 요청내용"
          placeholder="요청서 내용을 입력해주세요."
          name="content"
        />

        <div className="my-4">
          <Input
            register={register("Method")}
            required
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
                register={register("serviceDate")}
                required
                type="date"
                placeholder=""
                label=""
                name="serviceDate"
                kind="time"
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
                register={register("startTime")}
                required
                type="time"
                placeholder=""
                label=""
                name="startTime"
                kind="time"
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
              register={register("endTime")}
              required
              type="time"
              placeholder=""
              label=""
              name="endTime"
              kind="time"
            />
          </div>
        </div>
        <div className="my-4">
          <div className="">
            <Input
              register={register("Cost")}
              required
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
              수정하기
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

export default Update;
