import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  if (typeof id !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }
  const likes = await client.liked.findFirst({
    where: {
      serviceId: +id.toString(),
      userId: user?.id,
    },
  });
  if (likes) {
    await client.liked.delete({
      where: {
        id: likes.id,
      },
    });
  } else {
    await client.liked.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        service: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({
      ok: true,
      message: "like"
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);