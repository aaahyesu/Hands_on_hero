import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/navbar";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === "") return; // 빈 입력 방지

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "user", content: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { role: "bot", content: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Layout hasTabBar title="🐴말동무">
      <div className="container mx-auto max-w-[700px]">
        <div className="flex h-screen flex-col bg-gray-900">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text py-3 text-center text-6xl font-bold text-transparent">
            🐴말동무🐴
          </h1>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.role === "user" ? "bg-purple-500" : "bg-gray-800"
                    } max-w-sm rounded-lg p-4 text-white`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="max-w-sm rounded-lg bg-gray-800 p-4 text-white">
                    {/* 로딩 중 메시지 */}
                    Loading...
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-none p-6">
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <input
                type="text"
                className="flex-grow bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="메시지를 입력해 주세요 !"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-lg bg-purple-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-purple-600 focus:outline-none"
              >
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
