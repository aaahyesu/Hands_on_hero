import React, { useCallback } from "react";

type sinnerType = "button" | "page";

type Props = {
  kinds: sinnerType;
};

const Spinner = ({ kinds }: Props) => {
  const getSpinner = useCallback((kinds: sinnerType) => {
    switch (kinds) {
      case "button":
        return (
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-[5px] border-solid border-white/40 border-t-white bg-transparent text-xs" />
        );
      case "page":
        return (
          <aside className="animate-fade-in fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/60">
            <img src="/superman_bg_transparent.png" />
          </aside>
        );

      default:
        return (
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-[5px] border-solid border-white/40 border-t-white bg-transparent text-xs" />
        );
    }
  }, []);

  return <>{getSpinner(kinds)}</>;
};

export default Spinner;
