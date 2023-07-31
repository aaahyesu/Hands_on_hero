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
      {/* 유저명과 채팅내용 */}
      <div
        className={cls(
          "flex flex-grow-0 flex-col",
          $reversed ? "items-end" : ""
        )}
      >
        <span className="text-sm">{user.name}</span>
        <p className="max-w-[240px] rounded-md border-2 bg-orange-400 px-4 py-2 text-white">
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
