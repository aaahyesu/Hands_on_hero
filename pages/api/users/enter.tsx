import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, name } = req.body;
  const user = email ? { email } : {};
  if (!user)
    return res.status(400).json({
      ok: false,
      message: "",
    });
  const createUser = await client.user.create({
    data: {
            ...user,
            ...(name && { name }),
    },
  });

  req.session.user = {
    id: createUser.id,
  };
  await req.session.save();
  return res.json({
    ok: true,
    message: "gg",
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
