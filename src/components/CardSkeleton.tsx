import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="p-2 flex flex-col gap-2 rounded items-center border border-gray-100 w-fit h-fit">
      <Skeleton
        containerClassName="flex justify-center items-center h-52"
        className="h-"
        width={80}
        height={80}
      />
      <Skeleton width={160} height={20} count={2} />
    </div>
  );
};

export default CardSkeleton;
