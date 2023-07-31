import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
<<<<<<< HEAD

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      refreshInterval:2000,
      fetcher: (url: string) => fetch(url).then((response) => response.json()),}}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
=======
import { ToastContainer } from "react-toastify";

import Layout from "@/components/Navbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout hasTabBar>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="light"
        closeOnClick
      />
>>>>>>> c9d7cc7c3606323ca550218be7d1c29364d5fe03
    </SWRConfig>
  );
}

export default MyApp;
