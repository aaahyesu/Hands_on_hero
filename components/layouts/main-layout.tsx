import Head from "next/head";
// import Header from "components/header";
// import Footer from "components/footer";

interface MainLayoutProps {
  pageTitle?: string;
  hasFooter: boolean;
  children: React.ReactNode;
}

const MainLayout = ({ pageTitle, hasFooter, children }: MainLayoutProps) => {
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
