import { NextApiRequest, NextApiResponse } from "next";

// prisma
import prisma from "libs/client/prisma";

// helper function
import withHandler, { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 타겟
  const createdForId = +req.query.id;
  // 작성자
  const createdById = +req.session.user?.id!;

  // const serviceId = +req.query.id;

  try {
    // ...

    if (req.method === "GET") {
      const reviews = await prisma.review.findMany({
        where: {
          createdForId: createdForId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          serviceInfo: {
            // 연관된 서비스 정보를 가져오기 위한 필드 추가
            select: {
              title: true,
              serviceDate: true,
              Method: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      // 리뷰를 가공하여 서비스 정보를 추가한 배열 생성
      const reviewsWithServiceInfo = reviews.map((review) => ({
        ...review,
        serviceTitle: review?.serviceInfo?.title,
        serviceDate: review?.serviceInfo?.serviceDate,
        serviceMethod: review?.serviceInfo?.Method,
        serviceInfo: undefined, // 중첩된 서비스 정보 필드 제거
      }));

      return res.status(200).json({
        ok: true,
        message: "리뷰를 가져왔습니다.",
        reviews: reviewsWithServiceInfo,
      });

      // ...

      // if (req.method === "GET") {
      //   const reviews = await prisma.review.findMany({
      //     where: {
      //       createdForId: createdForId,
      //     },
      //     include: {
      //       createdBy: {
      //         select: {
      //           id: true,
      //           name: true,
      //           avatar: true,
      //         },
      //       },
      //     },
      //     orderBy: [
      //       {
      //         createdAt: "desc",
      //       },
      //     ],
      //   });
      //   console.log(reviews[0].serviceId);

      //   const service = await prisma.service.findUnique({
      //     where: {
      //       id: reviews[0].serviceId,
      //     },
      //     select: {
      //       title: true,
      //       serviceDate: true,
      //       Method: true,
      //     },
      //   });
      //   console.log(service);

      return res.status(200).json({
        ok: true,
        message: "리뷰를 가져왔습니다.",
        reviews,
      });
    } else if (req.method === "POST") {
      const rated1 = +req.body.score1;
      const rated2 = +req.body.score2;
      const rated3 = +req.body.score3;
      const rated4 = +req.body.score4;
      const serviceId = +req.body.serviceId;

      const createdReview = await prisma.review.create({
        data: {
          createdById,
          createdForId,
          score1: rated1,
          score2: rated2,
          score3: rated3,
          score4: rated4,
          serviceId: serviceId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      // 음 그리고 .then()써서 동기 처리 하면 오류 잘 안나던데....
      return res.status(201).json({
        ok: true,
        message: "리뷰를 생성했습니다.",
        createdReview,
      });
    }
  } catch (error) {
    console.error("/api/users/[id]/reviews error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
