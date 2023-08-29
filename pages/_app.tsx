import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import Layout from "@/components/navbar";

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API 요청이 실패했습니다.");
    }
    return response.json();
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 1000,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Layout hasTabBar>
          <Component {...pageProps} />
        </Layout> 
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="light"
        closeOnClick
      />
    </SWRConfig>
  );
}

export default MyApp;