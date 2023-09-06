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
    method
  } = req;
  
    const exService = await client.service.findUnique({
      where: {
        id: +id.toString(),
      },
    });

    if(method === "GET") {
      return res.status(200).json({
        ok: true,
        message: "서비스 정보",
        service: exService,
      });
    }
    if(method === "POST") {
      const {
        body: {title, content, Method, Cost, serviceDate, startTime, endTime},
      } = req;
      const EditServcie = await client.service.update({
        where: {
          id: +id.toString(),
        },
        data: {
          title, 
          content, 
          Method, 
          Cost: +Cost, 
          serviceDate, 
          startTime, 
          endTime,
        }
      });
      res.json({
        ok: true,
        message: "업데이트 완료",
        EditServcie,
      })
    }
  }

  export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
  );