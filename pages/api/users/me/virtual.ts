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
//   if (req.method === "GET") {
//     const virtual = await client.user.findMany({
//     });
//     res.json({
//       ok: true,
//       virtual,
//       message: "o"
//     });
//   }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);