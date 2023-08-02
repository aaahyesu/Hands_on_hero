import { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";

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


// import "../styles/globals.css";
// import "react-toastify/dist/ReactToastify.css";
// import type { AppProps } from "next/app";
// import { SWRConfig } from "swr";
// import { ToastContainer } from "react-toastify";

// import Layout from "@src/components/layout";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <SWRConfig value={{ fetcher }}>
//       <Layout hasTabBar>
//         <Component {...pageProps} />
//       </Layout>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         theme="dark"
//         closeOnClick
//       />
//     </SWRConfig>
//   );
// }

export default MyApp;