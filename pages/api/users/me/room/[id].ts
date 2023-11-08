import { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/client/prisma";
import withHandler, { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const idParam = req.query.id;

  if (idParam === undefined || Array.isArray(idParam)) {
    // 'id'가 없거나 배열인 경우에 대한 처리
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

  const serviceId = +idParam;

  if (isNaN(serviceId)) {
    // 'id'가 유효한 숫자가 아닌 경우에 대한 처리
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

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
    console.error("/api/services error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시 후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
