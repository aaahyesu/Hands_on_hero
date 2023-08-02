import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        body : {question},
        // session : {user},
    } = req;
    if (req.method === "POST") {
        const inquiry = await client.inquiry.create({
          data: {
            question,
            // user: {
            //   connect: {
            //     id: user?.id,
            //   },
            // },
        },
    });
    res.json({
      ok: true,
      inquiry,
    });
  }
  if (req.method === "GET") {
    const inquiries = await client.inquiry.findMany({
      include: {
        // user: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
        _count: {
          select: {
            answer: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      inquiries,
    });
  }
}

export default withHandler({ methods:  ["GET", "POST"], handler });