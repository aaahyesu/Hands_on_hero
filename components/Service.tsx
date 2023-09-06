import React from "react";

interface ListProps {
  id: number;
  title: string;
  serviceDate: Date;
  Method: string;
  status: "Start" | "Complete" | "Incomplete" | "None";
}

export default function List({ id, title, serviceDate, Method, status }: ListProps) {
  let statusText = "";
  let statusClass = "";
  let bgClass = "";

  if (status === "Start") {
    statusText = "서비스 중";
    statusClass = "bg-green-500";
    bgClass = "dark:bg-green-900 dark:text-green-300 bg-green-100 text-green-800";
  } else if (status === "Complete") {
    statusText = "서비스 완료";
    statusClass = "bg-red-500";
    bgClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  } else if (status === "Incomplete") {
    statusText = "서비스 미완료";
    statusClass = "bg-gray-500";
    bgClass = "bg-gray-300 text-gray-800 dark:text-gray-800 dark:bg-gray-300 dark:text-gray-800"
  } else if (status === "None"){}

  return (
    <div className="">
      <div className="max-w-sm text-xs">
        <div className="flex space-x-1">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-black">{title}</span>
              {statusText && (
                <span className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${bgClass}`}>
                <span className={`w-2 h-2 mr-1 rounded-full ${statusClass}`}></span>
                  {statusText}
              </span>
              )}
            </div>
            <span className="text-lg text-gray-500">{serviceDate}</span>
            <span className="text-lg text-gray-500">{Method}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
