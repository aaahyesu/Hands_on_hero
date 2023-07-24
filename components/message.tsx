import Image from "next/image";
import CreatedAt from "components/created-at";
import basicUser from "public/images/basic_user.png";

interface MessageProps {
  isMe: boolean;
  cloudflareImageId?: string;
  createdAt?: Date | string;
  text: string;
}

const Message = ({
  isMe,
  cloudflareImageId,
  text,
  createdAt,
}: MessageProps) => {
  return (
    <>
      {isMe === true ? (
        <div className="flex flex-row-reverse items-end mb-3">
          <div className="text-sm bg-blue-500 text-white rounded-2xl rounded-tr-none py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <CreatedAt
            date={createdAt}
            size="text-[12px]"
            style="text-gray-400 mr-2"
          />
        </div>
      ) : (
        <div className="flex mb-4">
          <div className=""></div>
          <div className="text-sm bg-gray-200 rounded-3xl rounded-tl-none ml-2 py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <div className="flex items-end">
            <CreatedAt
              date={createdAt}
              size="text-[12px]"
              style="text-gray-400 ml-2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
