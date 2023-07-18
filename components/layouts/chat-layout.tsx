import useSWR from "swr";
import React from "react";
import Link from "next/link";
import useMe from "libs/client/useMe";
import Username from "components/username";
import { CommonResult } from "libs/server/withHandler";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Chat, ChatMessage, Prisma, User } from "@prisma/client";

interface ChatLayoutProps {
  children: React.ReactNode;
}

interface ChatWithUserAndChatMessagesAndCount extends Chat {
  users: User[];
  chatMessages: ChatMessage[];
  _count: Prisma.ChatCountOutputType;
}

interface ChatsResult extends CommonResult {
  chats?: ChatWithUserAndChatMessagesAndCount[];
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const me = useMe();
  const { data } = useSWR<ChatsResult>(`/api/chats`);

  return (
    <div className="wrapper without-header">
      <div className="content">
        <div className="flex h-full">
          <div className="flex-1 border-l">
            <nav className="h-full">
              <div className="h-[60px] max-h-[60px] px-3 py-2">
                <Link href="/chats">
                  <a className="flex items-center space-x-2.5">
                    <Username
                      text={me?.username}
                      size="text-base"
                      textDecoration={false}
                    />
                  </a>
                </Link>
              </div>
              <ul className="h-[calc(100%_-_120px)] overflow-auto border-b border-t">
                {/* {data === undefined ? (
                  <div className="flex justify-center items-center h-[65px]">
                    <Loading color="orange" size={20} />
                  </div>
                ) : null} */}
                {data?.chats?.map((chat) => (
                  <li
                    key={chat.id}
                    className="border-b px-3 py-3 last-of-type:border-none hover:bg-gray-50"
                  >
                    <Link href={`/chats/${chat.id}`}>
                      <a className="flex items-center space-x-3">
                        {chat.users.map((user) => (
                          <React.Fragment key={user.id}>
                            {user.username !== me?.username ? (
                              <div key={user.id}></div>
                            ) : null}
                          </React.Fragment>
                        ))}
                        <div>
                          {chat?.users?.map((user) => (
                            <React.Fragment key={user.id}>
                              {user.username !== me?.username ? (
                                <div key={user.id} className="space-x-1.5">
                                  <Username
                                    text={user.username}
                                    size="text-[14px]"
                                    textDecoration={false}
                                  />
                                </div>
                              ) : null}
                            </React.Fragment>
                          ))}
                          {chat.chatMessages.slice(-1).map((chatMessage) => (
                            <div key={chatMessage.id} className="text-[12px]">
                              <span>{chatMessage.text}</span>
                            </div>
                          ))}
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="min-w-[730px] max-w-[730px] border-l border-r">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
