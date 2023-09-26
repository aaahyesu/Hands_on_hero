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
      const select = await client.room.findUnique({
        where: {
          id: +id.toString(),
        },
        select: {
          serviceId: true,
          users: true,
        }
      })
    
      const serviceUser = select?.users[1]?.id;
      const ServiceId = select?.serviceId;

      const updatedService = await client.service.update({
        where: {
          id: ServiceId
        },
        data: {
          status: "Start",
          serviceUserId: serviceUser, 
        },
      });

      res.json({
        ok: true,
        updatedService,
        message: "Service status updated to Start",
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
