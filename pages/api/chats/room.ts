import { NextApiRequest, NextApiResponse } from "next";

// helper function
import withHandler, { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";
import prisma from "libs/client/prisma";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    method,
  } = req;
  const ownerId = +req.body.ownerId;
  try {
    if (method === "GET") {
      const rooms = await prisma.room.findMany({
        where: {
          users: {
            some: {
              id: user?.id,
            },
          },
          OR: [
            {
              chatInvisibleTo: {
                equals: null,
              },
            },
            {
              chatInvisibleTo: {
                not: user?.id,
              },
            },
          ],
        },
        include: {
          users: {
            where: {
              NOT: {
                id: user?.id,
              },
            },
            select: {
              id: true,
              name: true,
              // avatar: true,
            },
          },
        },
      });
      console.dir(rooms);

      // 방들의 마지막 채팅 기준으로 시간 순 정렬
      const chatPromises = rooms.map((room) =>
        prisma.chat.findMany({
          take: 1,
          where: {
            roomId: room.id,
          },
          select: {
            chat: true,
            updatedAt: true,
            roomId: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        })
      );
      const roomsOfLastChat = (await Promise.all(chatPromises)).flat(1);
      roomsOfLastChat.sort((x, y) => (+x.updatedAt > +y.updatedAt ? -1 : 1));

      // 마지막 채팅을 기준으로 방들을 정렬
      const sortRooms = roomsOfLastChat.map((chat) =>
        rooms.find((room) => room.id === chat.roomId)
      );

      return res.status(200).json({
        ok: true,
        message: "모든 채팅방을 가져왔습니다.",
        rooms: sortRooms,
        roomsOfLastChat: roomsOfLastChat,
      });
    } else if (method === "POST") {
      const title = req.body.title;
      const serviceId = +req.body.serviceId;
      const exRoom = await prisma.room.findUnique({
        where: {
          name: title + user?.id + ownerId,
        },
      });

      // 이미 채팅방이 존재하면
      if (exRoom) {
        if (exRoom.chatInvisibleTo === user?.id) {
          await prisma.room.update({
            where: { id: exRoom.id },
            data: { chatInvisibleTo: null },
          });
        }

        return res.status(200).json({
          ok: true,
          message: "이미 채팅방이 존재합니다.",
          roomId: exRoom.id,
        });
      }

      const { id: roomId } = await prisma.room.create({
        data: {
          users: {
            connect: [
              {
                id: +user?.id!,
              },
              {
                id: +ownerId,
              },
            ],
          },
          name: title + user?.id + ownerId,
          Service: {
            connect: {
              id: serviceId,
            }
          }
        },
      });

      return res.status(201).json({
        ok: true,
        message: "채팅방을 생성했습니다.",
        roomId,
      });
    } else if (method === "DELETE") {
      const roomId = +req.body.roomId;

      const exRoom = await prisma.room.findUnique({ where: { id: roomId } });

      // 채팅방이 존재하지 않으면
      if (!exRoom) {
        return res.status(404).json({
          ok: true,
          message: "채팅방이 존재하지 않습니다.",
        });
      }

      // 이미 한명이 채팅방 나갔으면
      if (exRoom.chatInvisibleTo) {
        await prisma.room.delete({ where: { id: roomId } });
      }
      // 아무도 채팅방 안나갔다면
      else {
        await prisma.room.update({
          where: { id: roomId },
          data: { chatInvisibleTo: user?.id },
        });
        return res.status(200).json({
          ok: true,
          message: "채팅방을 나갔습니다.",
        });
      }
    }
  } catch (error) {
    console.error("/chats/room error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST", "DELETE"], handler })
);
