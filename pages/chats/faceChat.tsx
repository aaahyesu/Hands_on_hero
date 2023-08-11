import React, { useState } from "react";

const faceChat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white-600 font-[Poppins]">
      <span
        className="absolute left-4 top-5 cursor-pointer text-4xl text-white"
        onClick={toggleSidebar}
      >
        <i className="bi bi-filter-left rounded-md bg-gray-900 px-2"></i>
      </span>
      <div
        className={`sidebar fixed bottom-0 top-0 lg:left-0 ${
          sidebarOpen ? "left-0" : "left-[-300px]"
        } h-screen w-[300px] overflow-y-auto bg-gray-900 p-2 text-center duration-1000`}
      >
        <div className="text-xl text-gray-100">
          <div className="mt-1 flex items-center p-2.5">
            <i className="bi bi-app-indicator rounded-md px-2 py-1"></i>
            <h1 className="flex font-bold text-[1] text-gray-200">
              내 손 안의 화상통화
            </h1>
            <i
              className="bi bi-whatsapp ml-5 cursor-pointer lg:hidden"
              onClick={toggleSidebar}
            ></i>
          </div>
          <hr className="my-2 text-gray-600" />
        </div>

        <div className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-blue-600">
          <i className="bi bi-house-door-fill"></i>
          <span className="ml-4 text-[15px] text-gray-200">메인화면</span>
        </div>

        <div className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-blue-600">
          <i className="bi bi-backspace-fill"></i>
          <span className="ml-4 text-[15px] text-gray-200">
            채팅방으로 돌아가기
          </span>
        </div>
      </div>

      <main className="">
        <div id="welcome" className="mx-auto w-full max-w-4xl py-24">
          <i
            className="bi bi-person-badge flex justify-center py-10"
            style={{ fontSize: "150px" }}
          ></i>
          <form className="flex flex-col items-center space-y-6">
            <input
              className="w-60 rounded-lg border border-gray-300 p-2 text-center"
              placeholder="채팅방 코드 6자리 입력"
              required
              type="text"
            />
            <button className="rounded bg-gray-500 px-4 py-2 font-bold text-white duration-300 hover:bg-gray-700">
              입장하기
            </button>
          </form>
        </div>
        <div id="call" className="mx-auto w-full max-w-4xl">
          <div
            id="myStream"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <video
              id="myFace"
              autoPlay
              playsInline
              width="400"
              height="350"
            ></video>
            <video
              id="peerFace"
              autoPlay
              playsInline
              width="400"
              height="350"
            ></video>
            <div className="flex space-x-4">
              <button
                id="mute"
                className="rounded-full bg-gray-500 px-4 py-2 font-bold text-white  duration-300 hover:bg-gray-700"
              >
                음소거
              </button>
              <button
                id="camera"
                className="rounded-full bg-gray-500 px-4 py-2 font-bold text-white duration-300 hover:bg-gray-700"
              >
                카메라 끄기
              </button>
            </div>
            <div>
              <select
                id="cameras"
                className="rounded-lg border border-gray-300 py-1"
              ></select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default faceChat;
