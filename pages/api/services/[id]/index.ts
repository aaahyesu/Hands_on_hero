import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const service = await client.service.findUnique({
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
      reivew: true,
    },
  });
  const liked = Boolean(
    await client.liked.findFirst({
      where: {
        serviceId: service?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return res.json({
    ok: true,
    service,
    liked,
    message: "good",
  });
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
