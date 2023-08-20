import React, { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";

interface ListProps {
  id: number;
  title: string;
  serviceDate: Date;
  Method: string;
}

export default function List({ id, title, serviceDate, Method }: ListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-6">
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <Link href={`/services/${id}`}>
          <div className=" flex space-x-3">
            <div className="flex flex-col">
              <span className="mb-3 text-[25px] font-bold text-black">
                {title}
              </span>

              <div className="mb-2 flex items-center space-x-1">
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>

              <span className="text-lg text-gray-500">{serviceDate}</span>
              <span className="mb-2 text-lg text-gray-500">{Method}</span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className=" block rounded-md border border-gray-300  bg-black px-2 py-1 text-center text-xs font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 "
          type="button"
        >
          상세 리뷰 확인하기
        </button>

        {isModalOpen && (
          <div
            id="defaultModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50"
          >
            <div className="relative max-h-full w-full max-w-2xl">
              {/* Modal content */}
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700 ">
                {/* Modal header */}
                <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    요청서 상세 리뷰 ✏️
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      {/* ... SVG path definition */}
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="mb-2 mt-2 flex items-center">
                  <svg
                    className="mr-1 h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="mr-1 h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="mr-1 h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="mr-1 h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="mr-1 h-4 w-4 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    4.25 out of 5
                  </p>
                </div>
                <div className="mt-4 gap-8 sm:grid sm:grid-cols-2">
                  <div>
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        시간 약속을 잘 지켜요
                      </dt>
                      <dd className="mb-3 flex items-center">
                        <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          4.8
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        응답 속도가 빨라요
                      </dt>
                      <dd className="mb-3 flex items-center">
                        <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          3.8
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        매너가 좋아요
                      </dt>
                      <dd className="mb-3 flex items-center">
                        <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                            style={{ width: "64%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          3.4
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        서비스를 잘 수행해요
                      </dt>
                      <dd className="flex items-center">
                        <div className="mr-2 h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2.5 rounded bg-yellow-300 dark:bg-blue-500"
                            style={{ width: "84%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          4.4
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                  <button
                    onClick={() => {
                      closeModal();
                      router.push("/reviews");
                    }}
                    type="button"
                    className="rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}