import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import { start } from "repl";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { title, content, Method, Cost, serviceDate, startTime, endTime },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const services = await client.service.findMany({
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

    res.status(200).json({
      ok: true,
      message: "모든 상품들을 가져왔습니다.",
      services,
    });
  }
  if (req.method === "POST") {
    const createService = await client.service.create({
      data: {
        title,
        content,
        Method,
        Cost: +Cost,
        serviceDate,
        startTime,
        endTime,
        status: "None",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      service: createService,
      message: "good",
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
