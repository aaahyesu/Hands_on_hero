import { useCallback } from "react";

// type
import { ICON_SHAPE } from "types/index";
import { combineClassNames } from "libs/client/utils";

interface IProps {
  shape: ICON_SHAPE;
  width?: number;
  height?: number;
  className?: string;
  $fill?: boolean;
  $icon?: boolean;
}

const Icon = ({
  shape,
  className,
  width = 24,
  height = 24,
  $fill = false,
  $icon = false,
}: IProps) => {
  const getIcon = useCallback((shape: ICON_SHAPE) => {
    switch (shape) {
      case ICON_SHAPE.HOME:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        );
      case ICON_SHAPE.NEWS:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        );
      case ICON_SHAPE.CHAT:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        );
      case ICON_SHAPE.CAMERA:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        );
      case ICON_SHAPE.USER:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        );
      case ICON_SHAPE.PLUS:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        );
      case ICON_SHAPE.HEART:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        );
      case ICON_SHAPE.CHECK:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case ICON_SHAPE.PENCIL:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        );
      case ICON_SHAPE.BACK:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        );
      case ICON_SHAPE.CART:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        );
      case ICON_SHAPE.BAG:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        );
      case ICON_SHAPE.PHOTO:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        );
      case ICON_SHAPE.TWITTER:
        return (
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        );
      case ICON_SHAPE.GITHUB:
        return (
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        );

      default:
        break;
    }
  }, []);

  const getFillIcon = useCallback((shape: ICON_SHAPE) => {
    switch (shape) {
      case ICON_SHAPE.HOME:
        return <></>;
      case ICON_SHAPE.NEWS:
        return <></>;
      case ICON_SHAPE.CHAT:
        return <></>;
      case ICON_SHAPE.CAMERA:
        return <></>;
      case ICON_SHAPE.USER:
        return <></>;
      case ICON_SHAPE.PLUS:
        return <></>;
      case ICON_SHAPE.HEART:
        return (
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        );
      case ICON_SHAPE.CHECK:
        return <></>;
      case ICON_SHAPE.PENCIL:
        return <></>;
      case ICON_SHAPE.BACK:
        return <></>;
      case ICON_SHAPE.CART:
        return <></>;
      case ICON_SHAPE.BAG:
        return <></>;
      case ICON_SHAPE.PHOTO:
        return <></>;
      case ICON_SHAPE.STAR:
        return (
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        );

      default:
        break;
    }
  }, []);

  return (
    <>
      {$icon ? (
        <svg
          className={combineClassNames("h-5 w-5", className ? className : "")}
          aria-hidden="true"
        >
          {getIcon(shape)}
        </svg>
      ) : $fill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={combineClassNames(className ? className : "")}
        >
          {getFillIcon(shape)}
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className={combineClassNames(className ? className : "")}
        >
          {getIcon(shape)}
        </svg>
      )}
    </>
  );
};

export default Icon;
