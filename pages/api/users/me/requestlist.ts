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
  const requestlist = await client.requestlist.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      service: {
        include: {
          _count: {
            select: {
              liked: true,
            }
          }
        }
      }
    },
  });
  res.json({
      ok: true,
      requestlist,
      message: "request"
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);