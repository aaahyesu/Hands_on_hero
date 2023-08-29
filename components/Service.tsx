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
    <div className="">
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
  );
}
