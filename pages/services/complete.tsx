import { FunctionComponent, useCallback } from "react";
import Link from "next/link";

const complete: FunctionComponent = () => {
  const onGroupContainerClick = useCallback(() => {
    // Please sync "new 요청서 리스트" to the project
  }, []);

  return (
    <div className="font-inter relative h-[852px] w-full overflow-hidden bg-white text-left text-base text-white">
      <div className="absolute left-[161px] top-[452px] font-semibold leading-[125%]">
        Continue
      </div>
      <div className="font-nanumsquare-neo absolute left-[34px] top-[116px] inline-block w-[339px] text-center text-[30px] font-extrabold leading-[130%] tracking-[-0.01em] text-black">
        서비스 완료 ✨
      </div>
      <div
        className="absolute left-[20px] top-[707px] h-14 w-[353px] cursor-pointer"
        onClick={onGroupContainerClick}
      >
        <Link href="/">
          <div className="absolute left-[0px] top-[0px] h-14 w-[353px] rounded-[10px] bg-black" />
          <div className="absolute left-[154px] top-[19px] font-semibold leading-[125%]">
            확인
          </div>
        </Link>
      </div>

      <div className="absolute left-[10px] top-[171px] flex flex-row items-start justify-start p-2">
        <img
          className="relative h-[495px] w-[357px] object-cover"
          alt=""
          src="/superman_bg_white.png"
        />
      </div>
    </div>
  );
};

export default complete;
