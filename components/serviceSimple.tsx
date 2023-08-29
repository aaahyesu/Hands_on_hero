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
  return (
    <div className="item-center flex-5 px-2 py-5 ">
      <div className="py-2 text-lg font-bold text-gray-700">
        <p>리뷰 작성할 요청서 </p>
      </div>
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="max-w-sm text-xs ">
          <div className=" flex space-x-1">
            <div className="flex flex-col">
              <span className=" text-xl font-bold text-black">{title}</span>
              <span className="text-lg text-gray-500">{serviceDate}</span>
              <span className="text-lg text-gray-500">{Method}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}