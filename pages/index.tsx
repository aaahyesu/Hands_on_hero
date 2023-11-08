import type { NextPage } from "next";
import React, { useState } from "react";
import Layout from "@/components/navbar";
import Link from "next/link";
import useSWR from "swr";
import { Service } from "@prisma/client";
import List from "@/components/list";
interface Count extends Service {
  _count: {
    liked: number;
    room: number;
  };
}

interface ServiceResponse {
  ok: boolean;
  services: Count[];
  service_count: number;
}

const Home: NextPage<ServiceResponse> = () => {
  const { data } = useSWR<ServiceResponse>(
    typeof window === "undefined" ? null : "/api/services"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatusOption, setSelectedStatusOption] =
    useState("서비스 매칭 대기 중");

  const filterSearchResults = (services: Count[]) => {
    return services?.filter((service) => {
      let matchesSearch = false;
      if (selectedOption === "전체") {
        const serviceAsString = JSON.stringify(service);
        matchesSearch = serviceAsString
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      } else if (selectedOption === "제목") {
        matchesSearch = service.title
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      } else if (selectedOption === "서비스 방법") {
        matchesSearch = service.Method.toLowerCase().includes(
          searchKeyword.toLowerCase()
        );
      } else {
        matchesSearch = true; // Default case: no filtering
      }

      // 서비스 상태 필터링 추가
      let statusMatches = false;
      if (selectedStatusOption === "서비스 매칭 대기 중") {
        statusMatches = service.status === "None";
      } else if (selectedStatusOption === "서비스 매칭 완료") {
        statusMatches = service.status === "Start";
      } else if (selectedStatusOption === "서비스 완료") {
        statusMatches = service.status === "Complete";
      } else if (selectedStatusOption === "서비스 미완료") {
        statusMatches = service.status === "Incomplete";
      } else {
        statusMatches = true;
      }

      // 검색어와 상태 모두 일치하는 항목만 반환
      return matchesSearch && statusMatches;
    });
  };

  const dropdownOptions = ["전체", "제목", "서비스 방법"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);

  const statusDropdownOptions = [
    "서비스 매칭 대기 중",
    "서비스 매칭 완료",
    "서비스 완료",
    "서비스 미완료",
  ];
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // 검색 기능 구현
    if (data) {
      const filteredServices = filterSearchResults(data.services);
    }
  };

  return (
    <Layout hasTabBar title="요청서 리스트 📝">
      <div className="mt-6 flex flex-col px-4 ">
        <form onSubmit={handleSearch}>
          <div className="flex pt-4 ">
            <div className="relative">
              <button
                id="dropdown-button"
                className={`inline-flex w-32 flex-shrink-0 items-center rounded-l-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700 ${
                  isDropdownOpen ? "bg-gray-200" : ""
                }`}
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedOption}{" "}
                <svg
                  className={`ml-2 h-2.5 w-2.5 ${
                    isDropdownOpen ? "rotate-180 transform" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } z-10 divide-y rounded-[10px] border border-gray-300  dark:bg-gray-700`}
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown-button"
                >
                  {dropdownOptions.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={`w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          option === selectedOption ? "font-semibold" : ""
                        }`}
                        onClick={() => {
                          setSelectedOption(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500"
                placeholder="검색어를 입력하세요 :)"
                required
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="submit"
                className="border-black-700 dark:hover:bg-gary-700 absolute right-0 top-0 rounded-r-lg border bg-black p-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none dark:bg-gray-600 dark:focus:ring-gray-800"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <form>
          <div className="mt-4 flex">
            <button
              id="dropdown-button"
              className={`w-45 ml-auto inline-flex items-center rounded-lg border-[1.5px] border-black bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700 ${
                isDropdownOpen ? "bg-gray-200" : ""
              }`}
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              {selectedStatusOption}{" "}
              <svg
                className={`ml-2 h-2.5 w-2.5 ${
                  isDropdownOpen ? "rotate-180 transform" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="status-dropdown"
              className={`${
                isStatusDropdownOpen ? "block" : "hidden"
              }   divide-y rounded-[10px] border border-gray-300 dark:bg-gray-700`}
            >
              <ul
                className=" py-1 text-sm text-gray-700 dark:text-gray-300"
                aria-labelledby="status-dropdown-button"
              >
                {statusDropdownOptions.map((statusOption) => (
                  <li key={statusOption}>
                    <button
                      type="button"
                      className={`w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        statusOption === selectedStatusOption
                          ? "font-semibold"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedStatusOption(statusOption);
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {statusOption}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
        {data &&
          filterSearchResults(data?.services)?.map((service) => (
            <List
              key={service?.id}
              id={service?.id}
              title={service?.title}
              Cost={service?.Cost}
              serviceDate={service?.serviceDate.toString()}
              startTime={service?.startTime.toString()}
              endTime={service?.endTime.toString()}
              Method={service?.Method}
              liked={service?._count.liked}
              link={`/services/${service.id}`}
              status={service?.status}
            />
          ))}
        <Link href="/services/upload">
          <button className="fixed bottom-20 right-5 flex cursor-pointer justify-center rounded-full bg-black px-5 py-4 text-xl text-white shadow-xl transition-colors hover:bg-gray-400">
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            글쓰기
          </button>
        </Link>
        <div></div>
      </div>
    </Layout>
  );
};

export default Home;
