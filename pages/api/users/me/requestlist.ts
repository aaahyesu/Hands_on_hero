import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: {user},
  } = req;
    const services = await client.service.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        _count: {
          select: {
            liked: true,
            room: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({
      ok: true,
      services,
      message: "good",
    });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler })
);