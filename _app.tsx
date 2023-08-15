import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import Layout from "@/components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
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
