import { FunctionComponent, useCallback } from "react";
import Link from "next/link";

const Logout: FunctionComponent = () => {
  const onGroupContainerClick = useCallback(() => {}, []);

  return (
    <div className="mt-16 px-4">
      <h2 className="text-center text-4xl font-extrabold">로그아웃 완료 🙌</h2>
      <div className="mt-5">
        <div className="flex flex-col items-center">
          <img
            src="/superman_bg_transparent.png"
            alt="Superman Background"
            className="image-style "
          />
        </div>
        <Link href="/users/">
          <div className="mt-1 rounded-md border-2 border-transparent bg-black px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
            확인
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
