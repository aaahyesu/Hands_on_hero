import Head from "next/head";
// import Header from "components/header";

interface MainLayoutProps {
  pageTitle?: string;
  children: React.ReactNode;
}

const MainLayout = ({ pageTitle, children }: MainLayoutProps) => {
  return (
    <div>
      <Head>
        <title>
          {pageTitle || "내 손안의 히어로"} | 내 손안의 히어로를 만나보세요 !
        </title>
      </Head>
    </div>
  );
};

export default MainLayout;
