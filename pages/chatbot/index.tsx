import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "@/components/navbar";

export default function Home(): React.JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<
    { role: string; content: string; time: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadChatLogFromLocalStorage = () => {
    const savedChatLog = localStorage.getItem("chatLog");
    if (savedChatLog) {
      setChatLog(JSON.parse(savedChatLog));
    }
  };

  useEffect(() => {
    loadChatLogFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("chatLog", JSON.stringify(chatLog));
  }, [chatLog]);

  const clearChatLog = () => {
    localStorage.removeItem("chatLog");
    setChatLog([]);
  };

  const clearChatOncePerDay = () => {
    const now = new Date();
    const lastClearedDate = localStorage.getItem("lastClearedDate");

    if (
      !lastClearedDate ||
      now.getDate() !== new Date(lastClearedDate).getDate()
    ) {
      clearChatLog();
      localStorage.setItem("lastClearedDate", now.toISOString());
    }
  };

  useEffect(() => {
    clearChatOncePerDay();

    const interval = setInterval(() => {
      clearChatOncePerDay();
    }, 24 * 60 * 60 * 1000); // 24-hour interval (1 day)

    return () => clearInterval(interval);
  }, []);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === "") return;

    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

    const newMessage = {
      role: "user",
      content: inputValue,
      time: formattedTime,
    };

    setChatLog((prevChatLog) => [...prevChatLog, newMessage]);

    sendMessage(inputValue);

    setInputValue("");
  };
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // 초기 로딩 시 스크롤을 아래로 이동

    // 새로운 메시지가 추가될 때 스크롤을 아래로 이동
    scrollToBottom();
  }, [chatLog]);

  const sendMessage = (message: string) => {
    const url = "/api/chatbot";

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            '당신은 60대 어르신들의 말동무 "영자"입니다.\n어르신이라고 부르고 손주처럼 일상대화를 해주세요. 먼저, 안부를 물은 후 어르신이 심심하시면 흥미있는 질문을 해주고 답해주세요. 답변은 간결하게 하고, 어르신들은 가수 "임영웅"과 드라마 "진짜가 나타났다!", 노인정에서 사람들과 시간을 보내기, 자식들 이야기를 하는것 등을 좋아합니다.',
        },
        {
          role: "user",
          content: "아가, 밥먹었니?",
        },
        {
          role: "assistant",
          content:
            "안녕하세요, 어르신! 오늘 점심은 뭘 드셨어요? 맛있게 드시셨을까요?",
        },
        { role: "user", content: message },
      ],
    };

    setIsLoading(true);
    console.log(data);

    axios
      .post(url, data, {
        timeout: 1000000,
      })
      .then((response) => {
        console.log(response);
        const currentTime = new Date();
        const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

        const botMessage = {
          role: "bot",
          content: response.data.message,
          time: formattedTime,
        };

        setChatLog((prevChatLog) => [...prevChatLog, botMessage]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Layout hasTabBar title="🐴 말동무 챗봇 🐴">
      <div className="container mx-auto max-w-[700px] pt-[25px]">
        <div className="flex h-screen flex-col bg-gray-900">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text py-3 text-center text-6xl font-bold text-transparent">
            🐴말동무🐴
          </h1>
          <div className="flex-grow bg-gray-900 p-6">
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
                  {message.time !== null && (
                    <p className="ml-2 self-end text-xs text-gray-400">
                      {message.time}
                    </p>
                  )}
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="max-w-sm rounded-lg bg-gray-800 p-4 text-white">
                    {/* 로딩 중 메시지 */}잠 시 만 기 다 려 주 세 요...
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-none bg-gray-900 p-6">
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
              <div className="flex-none p-6">
                <button
                  onClick={clearChatLog}
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
                >
                  채팅 내용 지우기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
