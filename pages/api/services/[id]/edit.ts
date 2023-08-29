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

//   const service = await client.service.findUnique({
//     where: {
//       id: +id.toString(),
//     },
//     include: {
//       user: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//     },
//   });
//   const liked = Boolean(
//     await client.liked.findFirst({
//       where: {
//         serviceId: service?.id,
//         userId: user?.id,
//       },
//       select: {
//         id: true,
//       }
//     })
//   )
//   return res.json({
//     ok: true,
//     service,
//     liked,
//     message: "good",
//   });
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import withHandler, { ResponseType } from "@/libs/server/withHandler";
// import client from "@/libs/server/client";
// import { withApiSession } from "@/libs/server/withSession";

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseType>
// ) {
//     const {
//       body: { title, content, Method, Cost, serviceDate, startTime, endTime },
//       session: { user },
//     } = req;
//     const service = await client.service.update({
//         where: {
//             id: +id.toString(),
//         },
//       data: {
//         title,
//         content,
//         Method,
//         Cost: +Cost,
//         serviceDate,
//         startTime,
//         endTime,
//           user: {
//             connect: {
//               id: user?.id,
//             },
//         },
//       },
//     });
//     res.json({
//       ok: true,
//       service,
//       message: "good",
//     });
// }

// export default withApiSession(
//   withHandler({ methods: ["PUT"], handler })
// );
