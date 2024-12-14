import React, { memo, useCallback, useState } from "react";
import { Sideways } from "ultils/contants";
import { VoteBar, VoteOption, Comment, Button } from "components";
import { renderStarFromNumber } from "ultils/helpers";
import * as apis from "apis";
import { useSelector } from "react-redux";
import { showModal } from "../../store/appSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import path from "ultils/path";
import DOMPurify from "dompurify";
import withBase from "hocs/withBase";

const ProductInfomation = ({
  description,
  ratings,
  nameProduct,
  totalRating,
  pid,
  rerender,
  dispatch,
  navigate,
}) => {
  const [activedTab, setActivedTab] = useState(1);
  const { isLoggedIn } = useSelector((state) => state.user);

  // CALL API VOTE PRODUCT
  const handleSubmitVoteOption = useCallback(async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      toast.error("Please vote when click submit", { theme: "colored" });
      return;
    }
    const response = await apis.apiRatings({
      star: score,
      comment,
      pid,
      updatedAt: Date.now(),
    });
    if (response.success)
      Swal.fire("Successfully submitted", "Vote thành công", "success").then(
        () => {
          dispatch(
            showModal({
              isShowModal: false,
              modalChildren: null,
            })
          );
          rerender();
        }
      );
    else Swal.fire("Oops!", "Có lỗi gì đó đã phát sing", "error");
  }, []);

  // CHECK VOTE
  const handleVoteNow = () => {
    if (!isLoggedIn)
      Swal.fire({
        text: "Đăng nhập trước khi vote",
        showCancelButton: true,
        cancelButtonColor: "#ee3131",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đăng nhập",
        title: "Oops!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    else
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center gap-4 relative -bottom-[1px] border-b border-gray-300">
        {Sideways?.map((el) => (
          <span
            key={el.id}
            className={`px-6 py-3 text-lg font-semibold uppercase cursor-pointer transition-all duration-300 ${
              activedTab === el.id
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "bg-[#f1f1f1] hover:bg-white"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.title}
          </span>
        ))}
        <span
          className={`px-6 py-3 text-lg font-semibold uppercase cursor-pointer transition-all duration-300 ${
            activedTab === 5
              ? "bg-white text-blue-600 border-b-2 border-blue-600"
              : "bg-[#f1f1f1] hover:bg-white"
          }`}
          onClick={() => setActivedTab(5)}
        >
          Phản hồi khách hàng
        </span>
      </div>
      <div className="p-6">
        {activedTab === 1 && description?.length > 1 && (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {description?.map((el, index) => (
              <li key={index} className="text-sm">
                {el}
              </li>
            ))}
          </ul>
        )}
        {activedTab === 1 && description?.length === 1 && (
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description[0]),
            }}
          />
        )}
        {Sideways.some((el) => el.id === activedTab) && (
          <div className="w-full flex flex-col gap-6">
            {Sideways.find((el) => el.id === activedTab)?.content.length >
              0 && (
              <h3 className="uppercase text-xl font-semibold text-gray-900">
                {Sideways.find((el) => el.id === activedTab)?.header}
              </h3>
            )}
            <span className="text-gray-600">
              {Sideways.find((el) => el.id === activedTab)?.content}
            </span>
          </div>
        )}
        {activedTab === 5 && (
          <div className="w-full flex flex-col gap-6">
            <h3 className="uppercase text-xl font-semibold text-gray-900">
              Phản hồi khách hàng
            </h3>
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100 border rounded-lg">
                <span className="text-2xl font-semibold text-gray-800">{`${totalRating}/5`}</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  {renderStarFromNumber(totalRating)}
                </span>
                <span className="text-gray-600">{`${ratings?.length} đánh giá và nhận xét`}</span>
              </div>
              <div className="flex-2 p-6 bg-gray-50 border rounded-lg">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <VoteBar
                      key={el}
                      number={el + 1}
                      ratingTotal={ratings?.length}
                      ratingCount={
                        ratings?.filter((i) => i.star === el + 1)?.length
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="w-full flex justify-center gap-4">
              <Button
                name="Đánh giá ngay"
                handleOnclick={handleVoteNow}
                style="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              />
            </div>
            <div className="w-full space-y-6 mt-6">
              {ratings
                ?.filter((el) => el.posteBy !== null)
                ?.map((el) => (
                  <Comment
                    key={el._id}
                    star={el.star}
                    updatedAt={el.updatedAt}
                    comment={el.comment}
                    name={el.posteBy.firstname + " " + el.posteBy.lastname}
                    image={el.posteBy.avatar}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(ProductInfomation));
