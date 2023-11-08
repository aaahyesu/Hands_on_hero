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

  if (req.method === "POST") {
    try {
      const Service = await client.service.findUnique({
        where: {
            id: +id,
        },
      })

      // 요청자 정보 가져오기
      const paymoney = await client.user.findUnique({
        where: {
          id: Service?.userId
        },
      });

      if (!paymoney) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
        });
      }

      // 제공자 정보 가져오기
      const takemoney = await client.user.findUnique({
        where: {
          id: Service?.serviceUserId
        },
      });

      if (!takemoney) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
        });
      }

      // 정산
      const minusmoney = Number(paymoney?.virtualAccount) - Number(Service?.Cost)
      const plusmoney = Number(takemoney?.virtualAccount) + Number(Service?.Cost)

      // 요청자 가상 계좌를 업데이트
      const updatedUser1 = await client.user.update({
        where: {
          id: Service?.userId,
        },
        data: {
          virtualAccount: minusmoney,
        },
      });

      // 제공자 가상 계좌 업데이트
      const updatedUser2 = await client.user.update({
        where: {
          id: Service?.serviceUserId
        },
        data: {
          virtualAccount: plusmoney,
        },
      });

      res.json({
        ok: true,
        updatedUser1,
        updatedUser2,
        message: "계좌 수정이 완료되었습니다.",
      });
    } catch (error) {
      console.error("Error updating account:", error);
      res.status(500).json({
        ok: false,
        message: "Internal server error",
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);