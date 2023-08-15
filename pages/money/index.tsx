import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import inquiry from "../api/inquiry";
import { Inquiry, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import Input from "@/components/input";

interface virtualAccount {
  virtualAccount: string;
}

interface i {
  ok: boolean;
  virtualAccount: User;
}

const Money: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<virtualAccount>();
  const {user} =useUser();
  const [uploadinquiry, {loading, data}] = useMutation<i>("/api/users/me/virtual");
  const onValid = (data: virtualAccount) => {
    console.log(data);
    if (loading) return;
    uploadinquiry(data);
  };
  // useEffect(() => {
  //   if (data && data.ok) {
  //     router.push(`/inquires/${data.inquiry.id}`);
  //   }
  // }, [data, router]);

  return (
    <Layout hasTabBar canGoBack title="가상 머니 충전">
      <form onSubmit={handleSubmit(onValid)}>
      <div className="mt-4 flex items-center px-4 py-4 ">
        <span className=" mr-4 px-8 text-sm font-semibold text-gray-700">
          가상 머니 잔액
        </span>
        <div className="relative flex items-center rounded-lg shadow-sm">
          <div className="flex flex-col items-center  rounded-lg border border-gray-300 px-32 py-2 shadow-sm">
            {user?.virtualAccount}
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 py-4">
        <p className=" mr-4 px-10 text-sm font-semibold text-gray-700">
          충전할 금액
        </p>
        <div className="relative flex items-center rounded-lg shadow-sm">
        <Input
              register={register("virtualAccount", { required: true })}
              required
              //className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 pl-7 shadow-sm focus:border-black focus:outline-none"
              type="number"
              placeholder=""
              label=""
              name="VirtualAccount"
              kind="price"
            />
          {/* <input className="flex flex-col items-center  rounded-lg border border-gray-300 px-12 py-2 shadow-sm cursor-pointer text-center " /> */}
        </div>
      </div>
      <button className="px-60 mt-52 rounded-md border-2 border-transparent bg-black py-3 text-center font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 ">
        충전하기
      </button>
      <button className="text-blacks px-60 mt-4 rounded-md border-2 border-gray-300 bg-white py-3 text-center font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 ">
        취소하기
      </button>
      </form>
    </Layout>
  );
};
export default Money;
