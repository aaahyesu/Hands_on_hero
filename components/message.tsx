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
  // updatedAt를 Date 객체로 변환
  const updatedDate = new Date(updatedAt);

  // 변환한 Date 객체를 사용하여 시간과 분을 추출
  const hours = updatedDate.getHours();
  const minutes = updatedDate.getMinutes();

  // 시간과 분을 문자열로 변환하고, 필요한 경우 0을 추가하여 두 자리로 표시
  const formattedHours = hours % 12 || 12; // 0시는 12시로 표시, 12시는 그대로 표시
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // 오전 또는 오후 표시
  const amPm = hours >= 12 ? "오후" : "오전";

  // 시간과 분을 조합하여 오전/오후와 시간:분 형식으로 표시
  const formattedTime = `${amPm} ${formattedHours}:${formattedMinutes}`;

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
        {formattedTime}
      </span>
    </li>
  );
};

export default Message;
