import useSWR, { mutate } from "swr";
import { User } from ".prisma/client";
import error from "next/error";
export interface MeResult {
  ok: boolean;
  message: string;
  user?: User;
  error?: any;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useMe = () => {
  const { data } = useSWR<MeResult>("/api/users/me");
  return { me: data?.user, meLoading: !data && !error, meMutate: mutate };
};

export default useMe;
