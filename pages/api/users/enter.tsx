import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;
  const user = email ? { email } : {};
  const payload = Math.floor(10000 + Math.random() * 12345) + "";
  // const user = await client.user.upsert({
  //     where: {
  //       ...payload,
  //     },
  //     create: {
  //       ...payload,
  //       ...(password && { password }),
  //     },
  //     update: {},
  //   });
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
            ...(password && { password }),
          },
        },
      },
    },
  });
  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler({ method: ["POST"], handler, isPrivate: false });
