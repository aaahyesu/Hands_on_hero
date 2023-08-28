// import { useCallback, useEffect, useState } from "react";
// import type { NextPage } from "next";
// import Link from "next/link";
// import useSWRInfinite from "swr/infinite";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import useSWR from "swr";

// // type
// import { ICON_SHAPE, ApiResponse, SimpleUser } from "@/types";
// import { Review } from "@prisma/client";

// // common-component
// import UserReview from "components/Review";
// import Textarea from "components/textarea";
// import Button from "components/Button";

// // util
// import prisma from "libs/client/prisma";
// import { combineClassNames } from "libs/client/utils";

// // hook
// import useMe from "libs/client/useMe";

// import Icon from "@/components/Icon";
// import services from "../api/services";

// interface IReviewWithWriter extends Review {
//   createdBy: SimpleUser;
// }

// interface IReviewResponse extends ApiResponse {
//   reviews: IReviewWithWriter[];
// }
// interface ICreateReviewResponse extends ApiResponse {
//   createdReview: IReviewWithWriter;
// }
// type ReviewForm = {
//   review: string;
//   score: number;
// };

// interface IUserResponse extends ApiResponse {
//   user: {
//     id: number;
//     name: string;
//     avatar: string;
//     _count: {
//       receivedReviews: number;
//     };
//   };
// }

// const Reviews: NextPage<IUserResponse> = ({ user }) => {
//   const router = useRouter();
//   const { me } = useMe();
//   const { data } = useSWR(`/api/users/me/requestlist`);
//   console.log(data);
//   // 평점
//   const [score, setScore] = useState(1);
//   // 리뷰 토글
//   const [toggleReview, setToggleReview] = useState(true);
//   // 한번에 불러올 리뷰 개수
//   const [offset] = useState(5);

//   // 리뷰들 순차적 요청
//   const {
//     data: reviewsResponse,
//     size,
//     setSize,
//     mutate: reviewMutate,
//   } = useSWRInfinite<IReviewResponse>(
//     router.query.id
//       ? (pageIndex, previousPageData) => {
//           if (previousPageData && !previousPageData.reviews.length) return null;
//           return `/api/users/${router.query.id}/reviews?page=${pageIndex}&offset=${offset}`;
//         }
//       : () => null
//   );
//   console.log(data?.service);

//   return (
//     <>
//       {/* 리뷰 */}
//       <article className="mb-6">
//         <button type="button" onClick={() => setToggleReview((prev) => !prev)}>
//           리뷰 ( {user?._count?.receivedReviews}개 )
//         </button>
//         {toggleReview && (
//           <>
//             <ul className="space-y-4 divide-y-2">
//               {data?.services?.map((services) => (
//                 <UserReview
//                   id={services?.id}
//                   title={services?.title}
//                   serviceDate={services?.serviceDate}
//                   Method={services?.Method}
//                   score1={services?.review?.score1}
//                   score2={services?.review?.score2}
//                   score3={services?.review?.score3}
//                   score4={services?.review?.score4}
//                 />
//               ))}
//             </ul>

//             <section className="mt-6">
//               {Math.ceil(user?._count?.receivedReviews / offset) > size ? (
//                 <Button
//                   onClick={() => setSize((prev) => prev + 1)}
//                   text={`리뷰 ${
//                     user?._count?.receivedReviews - offset * size
//                   }개 더 불러오기`}
//                   $primary
//                   className="mx-auto block px-4"
//                   $loading={typeof reviewsResponse?.[size - 1] === "undefined"}
//                 />
//               ) : (
//                 <span className="my-2 block text-center text-sm font-semibold">
//                   더 이상 불러올 리뷰가 존재하지 않습니다.
//                 </span>
//               )}
//             </section>
//           </>
//         )}
//       </article>

//       <hr className="my-8 border" />
//     </>
//   );
// };

// export default Reviews;
