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
  const serviceId = req.query;

  try {
    // 특정 요청서에 대한 채팅 유저를 찾음
    const roomWithUser = await prisma.room.findMany({
      where: {
        serviceId,
      },
      select: {
        id: true,
        name: true,
        serviceId: true,
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      ok: true,
      message: "성공",
      roomWithUser,
    });
  } catch (error) {
    console.error("/api/products error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
