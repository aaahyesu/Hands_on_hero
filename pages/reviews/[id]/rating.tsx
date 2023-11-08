import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";

import useSWR from "swr";
import { useRouter } from "next/router";
import useUser from "@/libs/client/useUser";
import Service from "@/components/serviceSimple";
import React, { useCallback, useEffect } from "react";
import { ApiResponse, SimpleUser } from "@/types";
import { Review } from "@prisma/client";
import { Rating, Typography } from "@material-tailwind/react";

const ReviewList: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { data } = useSWR(`/api/services/${router.query.id}`);
  console.log(data);

  const [score1, setRated1] = React.useState(4);
  const [score2, setRated2] = React.useState(4);
  const [score3, setRated3] = React.useState(4);
  const [score4, setRated4] = React.useState(4);

  const serviceId = data?.service?.id;

  const handleReviewSubmit = async () => {
    const response = await fetch(`/api/services/${data?.service?.id}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score1: +score1,
        score2: +score2,
        score3: +score3,
        score4: +score4,
        serviceId: +serviceId,
        createdForId: data?.service?.userId,
      }),
    });
    console.log(router.query.id);

    const responseData = await response.json();
    if (responseData.ok) {
      // 리뷰 등록이 성공한 경우 처리
      console.log("리뷰가 등록되었습니다.");
    } else {
      // 리뷰 등록 실패한 경우 처리
      console.error("리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <Layout hasTabBar canGoBack title="리뷰 작성하기">
      <Service
        id={data?.service?.id}
        title={data?.service?.title}
        serviceDate={data?.service?.serviceDate.toString()}
        Method={data?.service?.Method}
      />
      <div className="px-3 py-2 text-lg font-bold text-gray-700">
        항목별 리뷰 작성하기{" "}
      </div>
      <div className="px-2">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div>
            <dl>
              <dt className=" px-3 font-medium text-gray-500 dark:text-gray-400">
                시간 약속을 잘 지켜요
              </dt>
              <div className=" flex items-center gap-2 px-3 ">
                <Rating
                  value={4}
                  onChange={(value) => setRated1(value)}
                  className=" text-yellow-400"
                />
                <Typography color="blue-gray" className="px-3 py-2 font-medium">
                  {score1}.0 점
                </Typography>
              </div>
            </dl>
            <dl>
              <dt className="px-3 pt-3 font-medium text-gray-500 dark:text-gray-400">
                응답 속도가 빨라요
              </dt>
              <div className="flex items-center gap-2 px-3 ">
                <Rating
                  value={4}
                  onChange={(value) => setRated2(value)}
                  className=" text-yellow-400"
                />
                <Typography color="blue-gray" className="px-3 py-2 font-medium">
                  {+score2}.0 점
                </Typography>
              </div>
            </dl>
            <dl>
              <dt className="px-3 pt-3 font-medium text-gray-500 dark:text-gray-400">
                매너가 좋아요
              </dt>
              <div className="flex items-center gap-2 px-3  ">
                <Rating
                  value={4}
                  onChange={(value) => setRated3(value)}
                  className=" text-yellow-400"
                />
                <Typography color="blue-gray" className="px-3 py-2 font-medium">
                  {+score3}.0 점
                </Typography>
              </div>
            </dl>
            <dl>
              <dt className="px-3 pt-3 font-medium text-gray-500 dark:text-gray-400">
                서비스를 잘 수행해요
              </dt>
              <div className="flex items-center gap-2 px-3 ">
                <Rating
                  value={4}
                  onChange={(value) => setRated4(value)}
                  className=" text-yellow-400"
                />
                <Typography color="blue-gray" className="px-3 py-2 font-medium">
                  {+score4}.0 점
                </Typography>
              </div>
            </dl>
          </div>
          <div className="space-x-6 px-3 py-4">
            <Link href="/" className="mx-auto">
              <button
                className="rounded-md bg-black px-3 py-2 font-semibold text-white shadow-md hover:bg-gray-800"
                onClick={handleReviewSubmit}
              >
                리뷰 등록하기
              </button>
            </Link>
            <Link href="/" className="mx-auto">
              <button className="rounded-md bg-white px-6 py-2 font-semibold text-black shadow-md hover:bg-gray-300">
                취소하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewList;
