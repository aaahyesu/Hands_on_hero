import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";

import useSWR from "swr";
import useUser from "@/libs/client/useUser";
import Review from "@/components/Review";
import services from "../../api/services";
import { useRouter } from "next/router";

const ReviewList: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { data } = useSWR(`/api/users/${router.query.id}/reviews`);

  return (
    <Layout hasTabBar canGoBack title="리뷰 내역">
      <div className="px-4">
        {data?.reviews?.map((reviews) => (
          <Review
            key={reviews?.id}
            id={reviews?.serviceId}
            title={reviews?.serviceTitle}
            score1={reviews?.score1}
            score2={reviews?.score2}
            score3={reviews?.score3}
            score4={reviews?.score4}
            // Cost={services.Cost}
            serviceDate={reviews?.serviceDate}
            Method={reviews?.serviceMethod}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ReviewList;
