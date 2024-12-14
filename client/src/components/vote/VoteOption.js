import React, { memo, useEffect, useState } from "react";
import Ant from "assets/ant.png";
import { ratings } from "ultils/contants";
import { Button } from "components";

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    setCountComment(comment.length);
  }, [comment]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[700px] rounded-lg p-4 animate-slide-top"
    >
      <img src={Ant} alt="logo" className="w-[150px] mx-auto object-contain" />
      <h2 className="text-2xl text-center font-semibold">
        <span>Đánh giá & nhận xét </span>
        <span className="capitalize">{nameProduct?.toLowerCase()}</span>
      </h2>
      <div className="w-full my-2 flex flex-col items-end gap-1">
        <textarea
          placeholder="Xin mời chia sẻ 1 số cảm nhận về sản phẩm"
          className="w-full min-h-[150px] max-h-[400px] textarea textarea-bordered"
          maxLength={2000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <span className="text-xs text-gray-400 whitespace-nowrap">{`${countComment} / 2000`}</span>
      </div>
      <div className="border rounded-md p-4 mb-4">
        <h2 className="font-semibold text-start">
          Bạn thấy sản phẩm này như thế nào?
        </h2>
        <div className="flex items-center justify-between p-4">
          {ratings.map((el) => (
            <span key={el.id} className="flex flex-col items-center gap-1 px-4">
              <span
                onClick={() => setChosenScore(el.id)}
                className={`${
                  Number(chosenScore) && chosenScore >= el.id
                    ? "text-main"
                    : "text-yellow-500"
                } cursor-pointer text-lg`}
              >
                {Number(chosenScore) && chosenScore >= el.id
                  ? el.iconClick
                  : el.icon}
              </span>
              <span>{el.title}</span>
            </span>
          ))}
        </div>
      </div>
      <Button
        wf
        name={"gửi đánh giá"}
        handleOnclick={() =>
          handleSubmitVoteOption({ comment, score: chosenScore })
        }
      />
    </div>
  );
};

export default memo(VoteOption);
