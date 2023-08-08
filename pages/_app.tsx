import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import Layout from "@/components/navbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      refreshInterval:2000,
      fetcher: (url: string) => fetch(url).then((response) => response.json()),}}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
        </div>
    </SWRConfig>
  );
}

export default MyApp;