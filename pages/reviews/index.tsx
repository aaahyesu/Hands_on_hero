import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";

import useSWR from "swr";
import useUser from "@/libs/client/useUser";
import { Service } from "@prisma/client";
import Review from "@/components/Review";

const ReviewList: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR("/api/services");
  return (
    <Layout hasTabBar canGoBack title="나의 리뷰 내역">
      <div className="mb-2 mt-4 flex items-center">
        <svg
          className="mr-1 h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="mr-1 h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="mr-1 h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="mr-1 h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="mr-1 h-4 w-4 text-gray-300 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          4.25 out of 5
        </p>
      </div>
      <div className="mt-4 gap-8 sm:grid sm:grid-cols-2">
        <div>
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              시간 약속을 잘 지켜요
            </dt>
            <dd className="mb-3 flex items-center">
              <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                  style={{ width: "95%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                4.8
              </span>
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              응답 속도가 빨라요
            </dt>
            <dd className="mb-3 flex items-center">
              <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                3.8
              </span>
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              매너가 좋아요
            </dt>
            <dd className="mb-3 flex items-center">
              <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                  style={{ width: "64%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                3.4
              </span>
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              서비스를 잘 수행해요
            </dt>
            <dd className="flex items-center">
              <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                  style={{ width: "84%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                4.4
              </span>
            </dd>
          </dl>
        </div>
      </div>
      {data?.services?.map((service) => (
        <Review
          id={service.id}
          title={service.title}
          Cost={service.Cost}
          serviceDate={service.serviceDate}
          Method={service.Method}
        />
      ))}
    </Layout>
  );
};

export default ReviewList;