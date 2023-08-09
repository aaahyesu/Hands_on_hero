import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/@types/chat";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SimpleUser,
  SocketData,
} from "@/types";
import prisma from "libs/client/prisma";
import { withApiSession } from "libs/server/withSession";
import withHandler from "libs/server/withHandler";

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(httpServer, {
      path: "/api/chats/socketio",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("소켓 연결 완료 >> ", socket.id);

      // 소켓 연결 후 방에 입장
      socket.on("onJoinRoom", (roomId) => {
        console.log("채팅방 입장 >> ", roomId);

        socket.join(roomId);
      });

      socket.on("onSend", async ({ userId, roomId, chat }) => {
        const chatPromise = prisma.chat.create({
          data: {
            chat,
            User: {
              connect: {
                id: userId,
              },
            },
            Room: {
              connect: {
                id: +roomId,
              },
            },
          },
        });

        const userPromise = prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            name: true,
          },
        });

        const [user] = await Promise.all([userPromise, chatPromise]);

        socket.broadcast.to(roomId).emit("onReceive", {
          user: user as SimpleUser,
          chat,
        });
      });
    });
  }

  res.end();
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
