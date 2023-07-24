import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, {ResponseType} from "@/libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const service = await client.service.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    ok: true, 
    service,
  });
}

export default withHandler({ methods: ["GET"], handler });