import { ReactChild, Suspense } from "react";

// util
import { cls } from "libs/client/utils";

// common-component
import Spinner from "./spinner";

type Props = {
  text: string | ReactChild;
  className?: string;
  $primary?: boolean;
  $loading?: boolean;
  [props: string]: any;
};

const Button = ({ text, className, $primary, $loading, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cls(
        $primary
          ? "rounded-md bg-black py-3 font-medium text-white hover:bg-gray-800 focus:outline-none"
          : "",
        className ? className : ""
      )}
    >
      {$loading ? (
        <Suspense fallback={<span>Loading...</span>}>
          <Spinner kinds="button" />
        </Suspense>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
