import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Review from "@/components/Review";
import useSWR from "swr";

import useUser from "@/libs/client/useUser";

const Profile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useSWR(
    router.query.id ? `/api/users/${router.query.id}/reviews` : null
  );

  return (
    <Layout canGoBack hasTabBar title="프로필 👤">
      <div className="px-4 py-10 ">
        <div className="flex items-center justify-between space-x-3 rounded-lg border border-gray-200 px-3 py-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-full bg-slate-500">
              <img
                src="/superman_bg_white.png"
                alt="Avatar"
                className="h-full w-full rounded-full shadow-md"
              />{" "}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">{user?.name}</span>
              <label
                htmlFor="number"
                className="text-sm font-semibold text-gray-700"
              >
                나의 가상 머니 : {user?.virtualAccount} 원
              </label>
            </div>
          </div>
          <Link href="/profile/edit">
            <p className="hover shadow-3xl rounded-lg bg-black px-1.5 py-2 text-[14px] text-white hover:bg-gray-700">
              프로필 수정하기
            </p>
          </Link>
        </div>
        <div className="px-4 py-6">
          <div className=" text-[23px] font-bold text-black">
            받은 리뷰 내역 ✍️
          </div>
          <div className="">
            {data?.reviews?.map((reviews) => (
              <Review
                key={reviews?.id}
                id={reviews?.serviceId}
                title={reviews?.serviceTitle}
                score1={reviews?.score1}
                score2={reviews?.score2}
                score3={reviews?.score3}
                score4={reviews?.score4}
                serviceDate={reviews?.serviceDate}
                Method={reviews?.serviceMethod}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
