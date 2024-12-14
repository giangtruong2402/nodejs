import React, { memo, useEffect, useRef } from "react";
import icons from "ultils/icons";

const { BsStarFill } = icons;

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText =
      ratingTotal > 0
        ? `right: ${100 - Math.round((ratingCount * 100) / ratingTotal)}%`
        : "right: 100%";
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 justify-between text-sm">
      <div className="flex w-[5%] items-center gap-1">
        <span className="px-1">{number}</span>
        <span>
          <BsStarFill color="#eab308" />
        </span>
      </div>
      <div className="w-[85%]">
        <div className="relative w-full h-2 rounded-full bg-gray-100">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-red-500 rounded-full"
          ></div>
        </div>
      </div>
      <div className="w-[10%] text-xs text-gray-500">{`${
        ratingCount || 0
      } reviews`}</div>
    </div>
  );
};

export default memo(VoteBar);
