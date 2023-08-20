import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import List from "@/components/list";
import { Service, User } from "@prisma/client";
import prisma from "@/libs/client/prisma";

interface UserCount extends Service {
  user: {id:number};
  _count: {liked: number};
}

interface UserService extends Request {
  services?: UserCount[];
  user?: User;
}

const MyList: NextPage<UserService> = ({services, user}) => {
  console.log(services)
  return (
    <Layout hasTabBar canGoBack title="나의 요청서 목록">
      <div className="flex flex-col space-y-5 py-2">
          {services?.map((service) => (
            <List
              // key={services.id}
              id={service.id}
              title={service.title}
              Cost={service.Cost}
              serviceDate={service.serviceDate}
              startTime={service.startTime}
              endTime={service.endTime}
              Method={service.Method}
              liked={service._count.liked}
              // list={service.list}
            />
              ))} 
        </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const foundProducts = await prisma.service.findMany({
    where: {
      user: { name: String(context.params?.name) },
    },
    include: {
      user: { select: { id: true } },
      _count: { select: { liked: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  
  const foundUser = await prisma.user.findFirst({
    where: { name: String(context.params?.name) },
  });
  
  return {
    props: {
      ok: true,
      message: "사용자 판매 중인 물품 보기에 성공하였습니다.",
      products: JSON.parse(JSON.stringify(foundProducts)),
      user: JSON.parse(JSON.stringify(foundUser)),
    },
    revalidate: 10,
  };
};


export default MyList;
