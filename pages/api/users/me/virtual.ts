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
        body: { virtualAccount },
    } = req;
    if (req.method === "POST") {
        const virtual = await client.user.update({
            where: {
                id: user?.id,
              },
              data: {
                virtualAccount: +virtualAccount,
              },
    });
    res.json({
      ok: true,
      virtual,
      message: "ok"
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);