import { cls } from "@/libs/utils";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode
}

export default function Layout({
    title,
    canGoBack, 
    hasTabBar, 
    children,
}: LayoutProps) {
    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    return (
        <div>
            <div className={cls(
                !canGoBack ? "justify-right" : "",
                "bg-white w-full h-12 justify-right text-lg px-4 font-medium fixed text-gray-800 border-b flex top-0 items-center")}>
                {canGoBack ? ( <button onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </button> ) : null}
                {title ? (
                    <span className={cls(canGoBack ? "justify-right px-2" : "", "")}>{title}</span>) : null}
            </div>
            <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
            {hasTabBar ? (
            <nav className="bg-white text-gray-800 border-t fixed bottom-0 w-full px-4 pb-5 pt-3 flex justify-between text-xs text-center">
                <Link href="/">
                    <span className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                    </svg>
                    <span>리스트</span>
                    </span>
                </Link>
                <Link href="/chats">
                    <span className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>채팅</span>
                    </span>
                </Link>
                <Link href="">
                    <span className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>말동무</span>
                    </span>
                </Link>
                <Link href="/profile">
                    <span className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                    </svg>
                    <span>마이페이지</span>
                    </span>
                </Link>
            </nav>) : null}
        </div>
    )

}