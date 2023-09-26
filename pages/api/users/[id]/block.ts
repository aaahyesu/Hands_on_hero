import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    const {
      query: { id },
      session: { user },
    } = req;

    const blockUserId: number = +id.toString();
    const blockById: number = user?.id ?? 0;
    
    if (req.method === "POST") {
      try {
        const block = await client.blockList.create({
          data: {
            blockUserId: blockUserId,
            blockById: blockById,
          },
        });
  
        res.json({
          ok: true,
          block,
          message: "차단되었습니다.",
        });
      } catch (error) {
        console.error("Error", error);
        res.status(500).json({
          ok: false,
          message: "Internal server error",
        });
      }
    }
  }
  
  export default withApiSession(
    withHandler({
      methods: ["POST"],
      handler,
    })
  );
  