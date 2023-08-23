import { NextApiRequest, NextApiResponse } from "next";

// prisma
import prisma from "libs/client/prisma";

// helper function
import withHandler, { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { method } = req;
  const userId = +req.session.user?.id!;

  try {
    const exUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // 내 정보 요청
    if (method === "GET") {
      return res.status(200).json({
        ok: true,
        message: "로그인된 유저의 정보입니다.",
        user: exUser,
      });
    }

    // 로그아웃
    else if (method === "PATCH") {
      req.session.destroy();

      return res.status(200).json({
        ok: true,
        message: "로그아웃에 성공했습니다.",
      });
    }
  } catch (error) {
    console.error("/api/users/me error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST", "DELETE"], handler })
);

// import { NextApiRequest, NextApiResponse } from "next";
// import withHandler, { ResponseType } from "@/libs/server/withHandler";
// import client from "@/libs/server/client";
// import { withApiSession } from "@/libs/server/withSession";

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseType>
// ) {
//   console.log(req.session.user);
//   const profile = await client.user.findUnique({
//     where: { id: req.session.user?.id },
//   });
//   res.json({
//       ok: true,
//       profile,
//       message: "clear"
//   });
// }

// export default withApiSession(withHandler({ methods: ["GET"], handler }));
