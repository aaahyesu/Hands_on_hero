// type
import { ICON_SHAPE, SimpleUser } from "@/types";
import { Review } from "@prisma/client";

// common-component
import Icon from "components/Icon";
import Avatar from "components/Avatar";

// util
import { combineClassNames } from "libs/client/utils";
import { timeFormat } from "libs/client/dateFormat";
import { ReactNode } from "react";

interface IReviewWithWriter extends Review {
  review: ReactNode;
  createdAt: number | Date;
  score: number;
  createdBy: SimpleUser;
}

interface IProps {
  review: IReviewWithWriter;
}

const Review = ({ review }: IProps) => {
  return (
    <li>
      <div className="mb-4 flex pt-4">
        <Avatar user={review.createdBy} className="mr-2" />
        <div className="flex-1">
          <h4>{review.createdBy.name}</h4>
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => i + 1)
              .map((v) => (
                <Icon
                  key={v}
                  shape={ICON_SHAPE.STAR}
                  $fill
                  className={combineClassNames(
                    "h-5 w-5",
                    v > review.score ? "text-gray-400" : "text-yellow-400"
                  )}
                />
              ))}
          </div>
        </div>
        <span className="text-xs font-semibold">
          ( {timeFormat(review.createdAt)} )
        </span>
      </div>
      <p className="whitespace-pre rounded-md bg-gray-200 px-4 py-2 text-sm">
        {review.review}
      </p>
    </li>
  );
};

export default Review;
