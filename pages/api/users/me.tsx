import { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/client/prisma";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { serviceId } = req.query;

  try {
    const roomWithUser = await prisma.room.findMany({
      where: {
        users: { some: { id: Number(serviceId) } },
      },
      include: {
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
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
