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

  if (typeof id !== "string") {
    // id가 string 타입이 아닌 경우에 대한 처리
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

  const exService = await client.service.findUnique({
    where: {
      id: +id,
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
    const EditService = await client.service.update({
      where: {
        id: +id,
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
    return res.json({
      ok: true,
      message: "업데이트 완료",
      EditService,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
