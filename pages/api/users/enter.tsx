import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/server/client"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body; 
  let user;
    user = await client.user.upsert({
      where: {
        ...(email && { email }),
      },
      create: {
        ...(email && { email }),
      },
      update: {},
    })
    console.log(user) ;
  res.status(200).end();
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });