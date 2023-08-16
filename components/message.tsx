import { SimpleUser } from "@/types";
import { cls } from "libs/client/utils";
import { timeFormat } from "@/libs/client/dateFormat";

interface MessageProps {
  message: string;
  $reversed?: boolean;
  updatedAt: Date;
  user: SimpleUser;
}

const Message = ({ message, updatedAt, user, $reversed }: MessageProps) => {
  return (
    <li
      className={cls(
        "flex space-x-2",
        $reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      {/* 동그란 원 (상대방 메시지일 때만) */}
      {!$reversed && (
        <div
          className={cls(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black", // 동그란 원 스타일
            "mr-1" // 오른쪽 여백
          )}
        >
          <img
            src="/superman_bg_white.png"
            alt="Avatar"
            className="h-full w-full rounded-full shadow-md"
          />
        </div>
      )}

      <div className="flex flex-col">
        {/* 이름 */}
        {!$reversed && <p className="text-xs text-black">{user.name}</p>}

        {/* 채팅 내용 */}
        <p className="max-w-[240px] rounded-2xl border-2 bg-black px-4 py-2 text-white">
          {message}
        </p>
      </div>
      {/* 채팅 작성 시간 */}
      <span className="self-end text-right text-sm text-gray-500">
        {timeFormat(updatedAt)}
      </span>
    </li>
  );
};

export default Message;
