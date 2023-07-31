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
          ? "rounded-md bg-blue-400 py-3 font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
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
