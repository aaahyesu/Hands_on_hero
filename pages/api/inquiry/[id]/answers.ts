import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> {
  const {
    query: { id },
    // session: { user },
    body: { answer },
  } = req;

  const newAnswer = await client.answer.create({
    data: {
    //   user: {
    //     connect: {
    //       id: user?.id,
    //     },
    //   },
      inquiry: {
        connect: {
          id: +id.toString(),
        },
      },
      answer,
    },
  });
  console.log(newAnswer);
  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withHandler({ methods: ["POST"], handler });