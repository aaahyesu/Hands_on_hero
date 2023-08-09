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
  const userIdParam = req.query?.id;

  if (!userIdParam || typeof userIdParam !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

  const userId = parseInt(userIdParam, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

  try {
    const exUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!exUser)
      return res.status(404).json({
        ok: false,
        message: "존재하지 않는 유저입니다.",
      });

    res.status(200).json({
      ok: true,
      message: "특정 유저의 정보입니다.",
      user: exUser,
    });
  } catch (error) {
    console.error("/api/users/[id] error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
