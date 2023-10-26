import type { NextPage } from "next";
import Layout from "@/components/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";
import Input from "@/components/input";
import { Service } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "@/components/textarea";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;

    // 선택한 날짜가 현재 날짜보다 이후인지 확인
    const currentDate = new Date();
    const selectedDate = new Date(selected);
    if (selectedDate < currentDate) {
      // 선택한 날짜가 현재 날짜 이전인 경우 경고 메시지 또는 다른 처리를 수행할 수 있습니다.
      console.warn("서비스 받을 날짜는 현재 날짜 이후이어야 합니다.");
      // 선택을 취소하거나 다른 조치를 취할 수 있습니다.
      return;
    }

    setSelectedDate(selected);
  };
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
        <div className="pt-6 my-2">
          <Input
            register={register("title", { required: true })}
            required
            type="text"
            placeholder="제목을 입력해주세요."
            label="제목"
            name="title"
            kind="text"
          />
        </div>

        <TextArea
          register={register("content", { required: true })}
          required
          label="상세 요청내용"
          placeholder="요청서 내용을 입력해주세요."
          name="content"
        />

        <div className="py-1">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            서비스 방법을 선택해주세요.
          </label>
          <select
            {...register("Method", { required: true })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="화상통화">화상통화</option>
            <option value="원격접속">원격접속</option>
            <option value="채팅">채팅</option>
          </select>
        </div>


        <div className="text my-1">
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
                onChange={handleDateChange} // 날짜 변경 핸들러 추가
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
            />
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <Input
              register={register("Cost", { required: true })}
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
            <button className="mr-6 mt-1 w-full flex-1 rounded-lg border border-transparent bg-black px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-gray-700 ">
              작성하기
            </button>
            <Link href="/">
              <button className="ml-6 mt-1 w-full flex-1 rounded-lg border border-gray-600 border-transparent bg-white px-4 py-3 text-sm font-bold text-black shadow-md hover:bg-gray-300 ">
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
