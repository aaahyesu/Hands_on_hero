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
        className="absolute left-[20px] top-[707px] h-14 w-[353px] cursor-pointer items-center"
        onClick={onGroupContainerClick}
      >
        <Link href="/" className="mx-auto">
          <button className="rounded-md px-[150px] bg-black py-3 font-semibold shadow-md text-white hover:bg-gray-800">확인</button>
        </Link>
        <div className="pt-4"></div>
        <Link href="/reviews/rating">
        <button className="rounded-md px-[115px] bg-white py-3 border shadow-md border-gray-500 font-semibold text-black hover:bg-gray-200">리뷰 작성하기</button>
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
