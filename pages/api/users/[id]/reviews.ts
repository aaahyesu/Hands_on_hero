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

  const createdForId = +req.session.user?.id!;

  try {
    
    if (req.method === "GET") {

      const reviews = await prisma.review.findMany({
        where: {
          createdForId: +createdForId,
        },
        include: {
          createdFor: {
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
