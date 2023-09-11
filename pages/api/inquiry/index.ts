import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const inquiry = await client.inquiry.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      inquiry,
      message: "ok",
    });
  }

  if (req.method === "GET") {
    if (user?.id === 1) {
      const inquiries = await client.inquiry.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              answer: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      res.json({
        ok: true,
        inquiries,
        message: "ok",
      });
    } else {
      const inquiries = await client.inquiry.findMany({
        where: {
          userId: user?.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              answer: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      res.json({
        ok: true,
        inquiries,
        message: "ok",
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
