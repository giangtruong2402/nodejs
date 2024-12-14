import React, { memo } from "react";
import Avatar from "assets/user.png";
import moment from "moment";
import "moment/locale/vi";
import { renderStarFromNumber } from "../../ultils/helpers";

const Comment = ({ image, name = "Anonymous", comment, star, updatedAt }) => {
  const formatTime = (createAt) => {
    moment.locale("vi");
    return moment(createAt).fromNow();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 flex-none flex gap-2">
        <div className="w-[42px] h-[42px] border rounded-full p-1">
          <img
            src={image || Avatar}
            alt="Logo User"
            className="w-[30px] h-[30px] object-contain rounded-full"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <h3 className="font-bold">{name}</h3>
          <span className="text-xs font-medium text-gray-500 capitalize">
            {formatTime(updatedAt)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-auto -mt-4">
        <div className="w-[5%]"></div>
        <div className="flex flex-col flex-auto gap-2 p-4 rounded-lg bg-gray-100 shadow-md">
          <span className="flex gap-2">
            <span className="font-semibold">Đánh giá:</span>
            <span className="flex items-center gap-1 text-yellow-500">
              {renderStarFromNumber(star)}
            </span>
          </span>
          <span className="flex gap-2">
            <span className="font-semibold whitespace-nowrap">Nội dung:</span>
            <span>{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
