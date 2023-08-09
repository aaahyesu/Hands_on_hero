import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query: {id},
    } = req;
    const inquiry = await client.inquiry.findUnique({
        where: {
            id: +id.toString(),
        },
        include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          answer: {
              select: {
                answer: true,
                id: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            _count: {
              select: {
                answer: true,
              },
            },
        }
    })
    res.json({
        ok: true,
        inquiry,
        message: ""
    })
}

export default withApiSession(
    withHandler({
      methods: ["GET"],
      handler,
    })
  );