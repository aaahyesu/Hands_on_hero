import { NextApiResponseServerIO } from "@/@types/chat";
import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  message: string;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE" | "PUT";

interface ConfigType {
  methods: method[];
  handler: (
    req: NextApiRequest,
    res: NextApiResponse & NextApiResponseServerIO
  ) => Promise<any>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse & NextApiResponseServerIO
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    // if (isPrivate && !req.session.user) {
    //   return res.status(401).json({ ok: false, error: "비로그인 상태입니다." });
    // }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
