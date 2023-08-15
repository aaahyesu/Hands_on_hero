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

  try {
    if (req.method === "GET") {
      const page = +req.query.page;
      const offset = +req.query.offset;

      const reviews = await prisma.review.findMany({
        take: offset,
        skip: page * offset,
        where: {
          createdForId: createdForId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              //   avatar: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      return res.status(200).json({
        ok: true,
        message: "리뷰를 가져왔습니다.",
        reviews,
      });
    } else if (req.method === "POST") {
      const review = req.body.review;
      const score = +req.body.score;

      const createdReview = await prisma.review.create({
        data: {
          createdById,
          createdForId,
          review,
          score,
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
