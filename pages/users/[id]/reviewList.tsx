import type { NextPage } from "next";
import Layout from "@/components/navbar";

import useSWR from "swr";
import Review from "@/components/Review";

import { useRouter } from "next/router";

const ReviewList: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/users/${router.query.id}/reviewBy`);
  console.log(data);
  return (
    <Layout hasTabBar canGoBack title="작성한 리뷰 내역">
      <div className="mt-6 px-4">
        {data?.reviews?.map((reviews) => (
          <Review
            key={reviews?.id}
            id={reviews?.serviceId}
            title={reviews?.serviceTitle}
            score1={reviews?.score1}
            score2={reviews?.score2}
            score3={reviews?.score3}
            score4={reviews?.score4}
            serviceDate={reviews?.serviceDate.toString()}
            Method={reviews?.serviceMethod}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ReviewList;
