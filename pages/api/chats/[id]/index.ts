// import { NextApiRequest, NextApiResponse } from "next";

// helper function
import withHandler from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";
import prisma from "libs/client/prisma";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     method,
//     session: { user },
//   } = req;
//   const roomId = +req.query.id;

//   try {
//     if (method === "GET") {
//       const page = +req.query.page;
//       const offset = +req.query.offset;

//       const chatsPromise = prisma.chat.findMany({
//         take: offset,
//         skip: page * offset,
//         where: {
//           roomId,
//         },
//         include: {
//           User: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//         orderBy: {
//           updatedAt: "desc",
//         },
//       });

//       // 현재 채팅방에 접근권한 확인
//       const isMinePromise = prisma.user.findFirst({
//         where: {
//           AND: {
//             id: +user?.id!,
//             rooms: {
//               some: {
//                 id: roomId,
//               },
//             },
//           },
//         },
//       });

//       const [chats, isMine] = await Promise.all([chatsPromise, isMinePromise]);

//       return res.status(200).json({
//         ok: true,
//         message: "모든 메시지를 가져왔습니다.",
//         chats: chats.reverse(),
//         isMine: !!isMine,
//       });
//     } else if (method === "POST") {
//     }
//   } catch (error) {
//     console.error("/api/chats/[id] error >> ", error);

//     res.status(500).json({
//       ok: false,
//       message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
//       error,
//     });
//   }
// }

// export default withApiSession(
//   withHandler({ methods: ["GET", "POST"], handler })
// );
