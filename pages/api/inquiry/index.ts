import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        body : {question},
        // session : {user},
    } = req;
    const inquiry = await client.inquiry.create({
        data: {
            question,
            // user: {
            //     connect: {
            //         id: user?.id
            //     }
            // }
        }
    })
    res.json({
        ok: true,
        inquiry
    })
}

export default withHandler({ methods: ["POST"], handler });