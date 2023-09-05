import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const serviceId = req.body.serviceId; 
    if (req.method === "POST") {
        const complete = await client.service.update({
            where: {
                id: serviceId,
            },
            data: {
                status: "Complete",
            }
    });
    res.json({
      ok: true,
      complete,
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