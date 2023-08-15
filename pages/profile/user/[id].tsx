import { useCallback, useEffect, useState } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// type
import { ICON_SHAPE, ApiResponse, SimpleUser } from "@src/types";
import { Review } from "@prisma/client";

// common-component
import Icon from "components/Icon";
import UserProfile from "components/Profile";
import UserReview from "@/components/Review";
import Textarea from "components/textarea";
import Button from "components/button";
import HeadInfo from "components/HeadInfo";
import Spinner from "components/spinner";

// utils
import prisma from "libs/client/prisma";
import { combineClassNames } from "libs/client/utils";

// hook
import useMe from "libs/client/useMe";
import useMutation from "libs/client/useMutation";
import SideButton from "components/SideButton";
import useResponseToast from "libs/useResponseToast";

interface IReviewWithWriter extends Review {
  createdBy: SimpleUser;
}

interface IReviewResponse extends ApiResponse {
  reviews: IReviewWithWriter[];
}
interface ICreateReviewResponse extends ApiResponse {
  createdReview: IReviewWithWriter;
}
type ReviewForm = {
  review: string;
  score: number;
};

interface IUserResponse extends ApiResponse {
  user: {
    id: number;
    name: string;
    avatar: string;
    _count: {
      receivedReviews: number;
    };
  };
}

const Profile: NextPage<IUserResponse> = ({ user }) => {
  const router = useRouter();
  const { me } = useMe();

  // 평점
  const [score, setScore] = useState(1);
  // 리뷰 토글
  const [toggleReview, setToggleReview] = useState(true);
  // 한번에 불러올 리뷰 개수
  const [offset] = useState(5);

  // 리뷰들 순차적 요청
  const {
    data: reviewsResponse,
    size,
    setSize,
    mutate: reviewMutate,
  } = useSWRInfinite<IReviewResponse>(
    router.query.id
      ? (pageIndex, previousPageData) => {
          if (previousPageData && !previousPageData.reviews.length) return null;
          return `/api/users/${router.query.id}/reviews?page=${pageIndex}&offset=${offset}`;
        }
      : () => null
  );
  // 리뷰 생성
  const [createReview, { data: createdReviewResponse, loading }] =
    useMutation<ICreateReviewResponse>(`/api/users/${router.query.id}/reviews`);
  // 리뷰 입력
  const { register, handleSubmit, reset } = useForm<ReviewForm>();
  // 리뷰 제출
  const onSubmitReview = useCallback(
    ({ review }: ReviewForm) => {
      if (loading) return;
      createReview({ score, review });

      reset();
    },
    [createReview, loading, reset, score]
  );
  //리뷰 생성 성공 시 데이터 넣어주기
  useEffect(() => {
    if (!createdReviewResponse?.ok) return;
    if (!createdReviewResponse.createdReview) return;

    reviewMutate(
      (prev) =>
        prev && [
          ...prev,
          {
            ok: true,
            message: "mutate로 리뷰 추가",
            reviews: [createdReviewResponse.createdReview],
          },
        ],
      false
    );
  }, [reviewMutate, createdReviewResponse]);

  // 회원 탈퇴 및 수정 모달 토글 값
  const [toggleModal, setToggleModal] = useState(false);
  //  회원 탈퇴
  const [
    deleteAccount,
    { data: deleteAccountResponse, loading: deleteAccountLoading },
  ] = useMutation<ApiResponse>(`/api/users/me`, "DELETE");
  // 회원 탈퇴
  const onDeleteAccount = useCallback(() => {
    if (deleteAccountLoading) return toast.warning("이미 회원탈퇴중입니다.");
    if (
      !confirm(
        "회원탈퇴를 하면 되돌릴 수 없습니다.\n정말 계정을 제거하시겠습니까?"
      )
    )
      return;
    deleteAccount({});
  }, [deleteAccount, deleteAccountLoading]);
  //  회원 탈퇴 성공 시 메시지 및 페이지 이동
  useResponseToast({
    response: deleteAccountResponse,
    move: "/enter",
  });
  // 로그아웃
  const [logOut, { data: logOutResponse, loading: logOutLoading }] =
    useMutation<ApiResponse>(`/api/users/me`, "PATCH");
  //  로그아웃
  const onLogOut = useCallback(() => {
    if (logOutLoading) return toast.warning("이미 로그아웃중입니다.");
    logOut({});
  }, [logOut, logOutLoading]);
  // 로그아웃 성공 시 메시지 및 페이지 이동
  useResponseToast({
    response: logOutResponse,
    move: "/enter",
  });

  if (router.isFallback) return <Spinner kinds="page" />;

  return (
    <>
      <HeadInfo
        title={`Hands_on_hero | ${user.name}님의 프로필`}
        description={`Hands_on_hero | ${user.name}님의 프로필 페이지입니다.`}
        photo={user.avatar}
      />

      {/* 프로필 or 수정 버튼 */}
      <article>
        {me?.id === user.id ? (
          <UserProfile user={user} href={"/profile/edit"} />
        ) : (
          <UserProfile user={user} />
        )}
      </article>

      {/* 판매내역, 구매내역, 관심목록 */}
      {me?.id === user.id && (
        <article>
          <ul className="flex items-center justify-around pt-4">
            <li>
              <Link href="/profile/sale">
                <a className="group flex flex-1 flex-col items-center focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-8">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-white group-hover:bg-orange-500 ">
                    <Icon shape={ICON_SHAPE.CART} />
                  </div>
                  <span className="font-medium text-gray-700">판매내역</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile/purchase">
                <a className="group flex flex-1 flex-col items-center focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-8">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-white group-hover:bg-orange-500">
                    <Icon shape={ICON_SHAPE.BAG} />
                  </div>
                  <span>판매완료내역</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile/buy">
                <a className="group flex flex-1 flex-col items-center focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-8">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-white group-hover:bg-orange-500">
                    <Icon shape={ICON_SHAPE.GIFT} />
                  </div>
                  <span>구매내역</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile/favorite">
                <a className="group flex flex-1 flex-col items-center focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-8">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-white group-hover:bg-orange-500">
                    <Icon shape={ICON_SHAPE.HEART} />
                  </div>
                  <span>관심목록</span>
                </a>
              </Link>
            </li>
          </ul>
          <br />
          <hr />
          <br />
        </article>
      )}

      {/* 리뷰 */}
      <article className="mb-6">
        <button type="button" onClick={() => setToggleReview((prev) => !prev)}>
          거래 후기 ( {user._count.receivedReviews}개 )
        </button>
        {toggleReview && (
          <>
            <ul className="space-y-4 divide-y-2">
              {reviewsResponse?.map((reviews) =>
                reviews.reviews.map((review) => (
                  <UserReview key={review.id} review={review} />
                ))
              )}
            </ul>

            <section className="mt-6">
              {Math.ceil(user._count.receivedReviews / offset) > size ? (
                <Button
                  onClick={() => setSize((prev) => prev + 1)}
                  text={`리뷰 ${
                    user._count.receivedReviews - offset * size
                  }개 더 불러오기`}
                  $primary
                  className="mx-auto block px-4"
                  $loading={typeof reviewsResponse?.[size - 1] === "undefined"}
                />
              ) : (
                <span className="my-2 block text-center text-sm font-semibold">
                  더 이상 불러올 리뷰가 존재하지 않습니다.
                </span>
              )}
            </section>
          </>
        )}
      </article>

      <hr className="my-8 border" />

      {me?.id !== user.id && (
        <article>
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => i + 1)
              .map((v) => (
                <Icon
                  key={v}
                  shape={ICON_SHAPE.STAR}
                  $fill
                  className={combineClassNames(
                    "h-8 w-8",
                    v > score ? "text-gray-400" : "text-yellow-400"
                  )}
                  onClick={() => setScore(v)}
                />
              ))}
          </div>
          <form onSubmit={handleSubmit(onSubmitReview)}>
            <Textarea
              register={register("review")}
              placeholder="리뷰를 입력해주세요"
            />
            <Button text="리뷰 작성" $primary className="w-full" />
          </form>
        </article>
      )}

      {/* 로그아웃 및 계정삭제 모달 토글 버튼 */}
      {me?.id === user.id && (
        <SideButton
          contents={<Icon shape={ICON_SHAPE.DOTS_H} />}
          onClick={() => setToggleModal((prev) => !prev)}
        />
      )}

      {/* 로그아웃 및 계정삭제 모달창 */}
      {toggleModal && (
        <aside
          className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/60"
          onClick={() => setToggleModal(false)}
        >
          <section className="mx-auto flex w-4/5 max-w-[460px] flex-col divide-y-2 overflow-hidden rounded-md bg-white">
            <button
              type="button"
              className="w-full p-4 text-xl transition-colors hover:bg-orange-100 hover:text-orange-500"
              onClick={onLogOut}
            >
              로그아웃
            </button>
            <button
              type="button"
              className="w-full p-4 text-xl transition-colors hover:bg-orange-100 hover:text-orange-500"
              onClick={onDeleteAccount}
            >
              계정삭제
            </button>
          </section>
        </aside>
      )}

      {/* 로그아웃 및 계정삭제 중 메시지 */}
      {deleteAccountLoading && (
        <aside className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/60">
          <section className="rounded-md bg-white px-8 py-12">
            <span className="whitespace-pre-line text-xl text-orange-500">
              {"회원탈퇴중입니다...\n잠시만 기다려주세요!"}
            </span>
          </section>
        </aside>
      )}

      {/* 로그아웃 및 계정삭제 중 메시지 */}
      {logOutResponse && (
        <aside className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/60">
          <section className="rounded-md bg-white px-8 py-12">
            <span className="whitespace-pre-line text-xl text-orange-500">
              {"로그아웃중입니다...\n잠시만 기다려주세요!"}
            </span>
          </section>
        </aside>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany();

  return {
    paths: users.map((user) => ({
      params: { id: user.id + "" },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const userId = Number(context.params?.id) || +context.params?.id! || 1;

  const exUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      _count: {
        select: {
          receivedReviews: true,
        },
      },
    },
  });

  return {
    props: {
      ok: true,
      message: "특정 유저의 정보입니다.",
      user: exUser,
    },
    revalidate: 60 * 10,
  };
};

export default Profile;
