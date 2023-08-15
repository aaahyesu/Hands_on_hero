import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const services = await client.service.findMany({
      include: {
        _count: {
          select: {
            liked: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      services,
      message: "good",
    });
  }
  if (req.method === "POST") {
    const {
      body: { title, content, Method, Cost, serviceDate, startTime, endTime },
      session: { user },
    } = req;
    const service = await client.service.create({
      data: {
        title,
        content,
        Method,
        Cost: +Cost,
        serviceDate,
        startTime,
        endTime,
          user: {
            connect: {
              id: user?.id,
            },
        },
      },
    });
    res.json({
      ok: true,
      service,
      message: "good",
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
