import React from "react";

interface ListProps {
  id: number;
  title: string;
  serviceDate: string;
  Method: string;
  status: "Start" | "Complete" | "Incomplete" | "None";
}

export default function List({
  id,
  title,
  serviceDate,
  Method,
  status,
}: ListProps) {
  let statusText = "";
  let statusClass = "";
  let bgClass = "";

  if (status === "Start") {
    statusText = "서비스 매칭 완료";
    statusClass = "bg-green-500";
    bgClass =
      "dark:bg-green-900 dark:text-green-300 bg-green-100 text-green-800";
  } else if (status === "Complete") {
    statusText = "서비스 완료";
    statusClass = "bg-red-500";
    bgClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  } else if (status === "Incomplete") {
    statusText = "서비스 미완료";
    statusClass = "bg-gray-500";
    bgClass =
      "bg-gray-300 text-gray-800 dark:text-gray-800 dark:bg-gray-300 dark:text-gray-800";
  } else if (status === "None") {
    statusText = "서비스 매칭 대기 중";
    statusClass = "bg-blue-500";
    bgClass =
      "bg-blue-200 text-blue-800 dark:text-blue-800 dark:bg-blue-300 dark:text-blue-800";
  }

  return (
    <div className="">
      <div className="flex items-center">
        <span className="text-[15px] font-bold text-black">{title}</span>
      </div>
      {statusText && (
        <span
          className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgClass}`}
        >
          <span className={`mr-1 h-2 w-2 rounded-full ${statusClass}`}></span>
          {statusText}
        </span>
      )}
      <div className="text-sm text-gray-500">{serviceDate}</div>
      <div className="text-sm text-gray-500">{Method}</div>
    </div>
  );
}
