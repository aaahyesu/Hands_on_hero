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
  const responselists = await client.responselist.findMany({
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
      responselists,
      message: "response"
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);