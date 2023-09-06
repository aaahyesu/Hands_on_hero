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
    try {
      // 현재 가상 계좌 잔액을 가져오기
      const money = await client.user.findUnique({
        where: {
          id: user?.id,
        },
      });

      if (!money) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
        });
      }

      // 입력받은 가상 계좌 값을 더하기
      const updatedmoney = money.virtualAccount + Number(virtualAccount);

      // 가상 계좌를 업데이트
      const updatedUser = await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          virtualAccount: updatedmoney,
        },
      });

      res.json({
        ok: true,
        virtualAccount: updatedUser.virtualAccount,
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
