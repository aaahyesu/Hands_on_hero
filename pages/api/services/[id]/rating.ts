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
  const {
    query: { id },
  } = req;

  try {
    
    const service = await prisma.service.findUnique({
      where: {
        id: +id.toString(),
      }
    })

    const createdForId = Number(service?.serviceUserId);
    const createdById = Number(service?.userId);
    console.log(createdById);
    console.log(createdForId);
    if (req.method === "POST") {

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

          return res.status(201).json({
            ok: true,
            message: "리뷰를 생성했습니다.",
            createdReview,
          });

    } 
  } catch (error) {
    console.error("/api/services/[id]/rating error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler })
);
