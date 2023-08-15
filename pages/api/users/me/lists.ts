import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import { Kind } from "@prisma/client";
export function getRecordKind(string: any): Kind | undefined {
    if (typeof string !== "string") return undefined;
    const small = string.toLowerCase();
    switch (small) {
      case Kind.Requestlist.toLowerCase():
        return Kind.Requestlist;
      case Kind.Responselist.toLowerCase():
        return Kind.Responselist;
      case Kind.Liked.toLowerCase():
        return Kind.Liked;
      default:
        return undefined;
    }
  }
  
  async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    const {
      session: { user },
      query: { kind },
    } = req;
    const recordKind = getRecordKind(kind);
    if (recordKind) {
      const lists = await client.list.findMany({
        where: {
          userId: user?.id,
          kind: recordKind,
        },
        include: {
          service: true,
        },
      });
      res.json({
          ok: true,
          lists,
          message: "list ok"
      });
    } else {
      res.json({
          ok: false,
          message: "list fail"
      });
    }
  }
  
  export default withApiSession(
    withHandler({
      methods: ["GET"],
      handler,
    })
  );