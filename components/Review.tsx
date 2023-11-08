import React from "react";
import Link from "next/link";
import { Rating, Typography } from "@material-tailwind/react";

interface ListProps {
  id: number;
  title: string;
  serviceDate: string;
  Method: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
}

export default function List({
  id,
  title,
  serviceDate,
  Method,
  score1,
  score2,
  score3,
  score4,
}: ListProps) {
  console.log("score1:", score1);
  console.log("score2:", score2);
  console.log("score3:", score3);
  console.log("score4:", score4);

  const StarSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );

  // 별점을 나타내는 함수
  const renderStars = (score: number) => {
    const maxScore = 5;
    const starElements = [];

    for (let i = 1; i <= maxScore; i++) {
      if (i <= score) {
        starElements.push(
          <span key={i} className="text-yellow-300">
            {StarSVG}
          </span>
        );
      } else {
        starElements.push(
          <span key={i} className="text-gray-300">
            {StarSVG}
          </span>
        );
      }
    }

    return starElements;
  };

  return (
    <div className="pt-6">
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <Link href={`/services/${id}`}>
          <div className="flex space-x-3">
            <div className="flex flex-col">
              <span className="mb-3 px-3 text-[25px] font-bold text-black">
                {title}
              </span>
              {/* Render stars using the score prop */}
              <dt className=" px-3  text-lg font-medium text-gray-500 dark:text-gray-400">
                시간 약속을 잘 지켜요
              </dt>
              <div className="flex  space-x-1 px-3 py-2">
                {renderStars(score1)}
                <Typography color="blue-gray" className="px-3  font-medium">
                  {score1}.0 점
                </Typography>
              </div>

              <dt className="px-3 py-3 text-lg font-medium text-gray-500 dark:text-gray-400">
                응답 속도가 빨라요
              </dt>
              <div className="flex space-x-1 px-3 ">
                {renderStars(score2)}
                <Typography color="blue-gray" className="px-3 font-medium">
                  {score2}.0 점
                </Typography>
              </div>
              <dt className="px-3 py-3 text-lg font-medium text-gray-500 dark:text-gray-400">
                매너가 좋아요
              </dt>
              <div className="flex space-x-1 px-3 ">
                {renderStars(score3)}
                <Typography color="blue-gray" className="px-3 font-medium">
                  {score3}.0 점
                </Typography>
              </div>
              <dt className="px-3 py-3 text-lg font-medium text-gray-500 dark:text-gray-400">
                서비스를 잘 수행해요
              </dt>
              <div className="flex space-x-1 px-3 ">
                {renderStars(score4)}
                <Typography color="blue-gray" className="px-3 font-medium">
                  {score4}.0 점
                </Typography>
              </div>
              <span className="px-3 text-lg text-gray-500">
                {serviceDate}
              </span>
              <span className="mb-2 px-3 text-lg text-gray-500">{Method}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
