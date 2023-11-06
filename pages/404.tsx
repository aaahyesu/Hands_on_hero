import { NextPage } from "next";
import { useRouter } from "next/router";

const Error: NextPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="mt-6 flex flex-col px-4">
      <h2 className="text-center text-4xl font-extrabold">404 Error</h2>
      <div className="mt-5">
        <div className="flex flex-col items-center">
          <img
            src="/superman_bg_transparent.png"
            alt="Superman Background"
            className="image-style "
          />
          <h5 className="text-md font-medium text-gray-500">
            죄송합니다. 요청하신 항목을 찾을 수 없습니다.
          </h5>
          <button
            className="mt-10 rounded-md border-2 border-transparent bg-black px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2"
            onClick={handleGoBack}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
