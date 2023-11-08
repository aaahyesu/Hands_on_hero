import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  if (typeof id !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Invalid 'id' parameter",
    });
  }

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      inquiry: {
        connect: {
          id: +id,
        },
      },
      answer,
    },
  });
  console.log(newAnswer);
  res.json({
    ok: true,
    answer: newAnswer,
    message: ""
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);