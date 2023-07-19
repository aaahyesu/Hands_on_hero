import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import ChatLayout from "@/components/layouts/chat-layout";
import MainLayout from "@/components/layouts/main-layout";

const Chats: NextPage = () => {
  return (
    <MainLayout pageTitle="채팅">
      <ChatLayout>
        <div className="flex h-full flex-col items-center justify-center text-gray-300">
          <p className="mt-3 text-sm font-medium">
            채팅할 상대를 선택해주세요 .
          </p>
        </div>
      </ChatLayout>
    </Mainlayout>
  );
};

export default Chats;
