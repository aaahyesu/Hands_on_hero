import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";

interface IOption {
  initialPage?: number;
  initialOffset?: number;
}

export default function usePagination<T>(
  url: string | null,
  { initialPage = 1, initialOffset = 10 }: IOption
): [
  { data?: T; error: any; isValidating: boolean },
  { page: number; setPage: Dispatch<SetStateAction<number>> },
  {
    offset: number;
    setOffset: Dispatch<SetStateAction<number>>;
  }
] {
  const [page, setPage] = useState(initialPage);
  const [offset, setOffset] = useState(initialOffset);
  const { data, error, isValidating } = useSWR<T>(
    url === null
      ? null
      : url.includes("?")
      ? `${url}&page=${page}&offset=${offset}`
      : `${url}?page=${page}&offset=${offset}`
  );

  return [
    { data, error, isValidating },
    { page, setPage },
    { offset, setOffset },
  ];
}