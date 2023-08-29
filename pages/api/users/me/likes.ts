import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const liked = await client.liked.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      service: {
        include: {
          _count: {
            select: {
              liked: true,
              room: true,
            }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({
      ok: true,
      liked,
      message: "liked"
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);