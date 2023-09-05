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
  } = req;
  
  if (req.method === "PATCH") {
    try {
      const updatedService = await client.service.update({
        where: {
          id: +id.toString(),
        },
        data: {
          status: "Incomplete",
        },
      });

      res.json({
        ok: true,
        updatedService,
        message: "Service status updated to Incomplete",
      });
    } catch (error) {
      console.error("Error updating service status:", error);
      res.status(500).json({
        ok: false,
        message: "Internal server error",
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["PATCH"],
    handler,
  })
);
