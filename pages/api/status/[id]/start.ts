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
      // 채팅방과 관련된 서비스 아이디, 사용자들 찾기
      const select = await client.room.findUnique({
        where: {
          id: +id.toString(),
        },
        select: {
          serviceId: true,
          users: true,
        }
      })

      const ServiceId = select?.serviceId;
      const findUser1 = select?.users[0]?.id;
      const findUser2 = select?.users[1]?.id;
      let findUser: number | undefined;
      
      const find = await client.service.findUnique({
        where: {
          id: ServiceId
        },
        select: {
          userId: true
        }
      })

      // 사용자들의 아이디 비교 후 제공자 아이디 설정

      if (find?.userId !== findUser1) {
        findUser = findUser1;
      } else if (find?.userId !== findUser2) {
        findUser = findUser2;
      }

      if (findUser === undefined) {
        return res.status(500).json({
          ok: false,
          message: "Unable to determine the service user",
        });
      }

      const serviceUser = findUser;


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
