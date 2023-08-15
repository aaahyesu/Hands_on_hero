import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password, name } = req.body;
  const user = email ? { email } : {};
  if (!user)
    return res.status(400).json({
      ok: false,
      message: "",
    });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
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
            ...(name && { name }),
          },
        },
      },
    },
  });
  console.log(token);
  return res.json({
    ok: true,
    message: "gg",
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
