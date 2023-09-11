import type { NextPage } from "next";
import Layout from "@/components/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const Profile: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/users/${router.query.id}`);
  console.log(data);

  return (
    <Layout canGoBack hasTabBar title="프로필 👤">
      <div className="px-4 py-10">
        <div className="flex items-center space-x-3 rounded-lg border border-gray-200 px-3 py-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-full bg-slate-500" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">
                {data?.user?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-around"></div>
      </div>
    </Layout>
  );
};

export default Profile;
