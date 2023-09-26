import type { NextPage } from "next";
import Layout from "@/components/navbar";
import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import Input from "@/components/input";
import Link from "next/link";

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

  return (
    <Layout hasTabBar canGoBack title="가상 머니 충전">
      <form onSubmit={handleSubmit(onValid)}>
      <div className="mt-10 flex items-center px-4 py-4 ">
        <span className=" mr-4 px-8 text-sm font-semibold text-gray-700">
          가상 머니 잔액
        </span>
        <div className="relative flex items-center rounded-lg shadow-sm">
          <div className="flex flex-col items-center  rounded-lg border border-gray-300 px-32 py-2 shadow-sm">
            {user?.virtualAccount}
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 py-4 pb-40">
        <p className=" mr-4 px-10 text-sm font-semibold text-gray-700">
          충전할 금액
        </p>
        <div className="relative flex items-center rounded-lg shadow-sm">
        <Input
              register={register("virtualAccount", { required: true })}
              required
              type="number"
              placeholder=""
              label=""
              name="VirtualAccount"
              kind="price"
            />
        </div>
      </div>
      <div className="flex justify-center gap-4">
      <button className="px-20 rounded-md border-2 border-transparent bg-black py-3 text-center font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1">
        충전하기
      </button>
      <Link href="/mypage">
      <button className="px-20 rounded-md border-2 border-gray-300 bg-white py-3 text-center font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1">
        취소하기
      </button>
      </Link>
      </div>
      </form>
    </Layout>
  );
};
export default Money;