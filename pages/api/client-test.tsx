import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      name: "gazero",
      // phoneNumber: "010-1444-1234",
      // gender: 0,
      // birthdate: "2004-02-02",
      // password: "1234",
      email: "asdf@asasd.com",
      // introduction: "hi",
    },
  });
  res.json({
    ok: true,
  });
}
