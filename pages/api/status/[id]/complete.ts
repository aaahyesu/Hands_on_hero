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

  if (typeof id !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }
  
  if (req.method === "PATCH") {
    try {
      const updatedService = await client.service.update({
        where: {
          id: +id,
        },
        data: {
          status: "Complete",
        },
      });

      res.json({
        ok: true,
        updatedService,
        message: "Service status updated to Complete",
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
