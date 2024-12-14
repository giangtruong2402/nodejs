import React, { memo } from "react";
import withBase from "hocs/withBase";
import { showModal } from "store/appSlice";
import icons from "ultils/icons";
import noProduct from "assets/logo-image.jpg";
import { formatMoney } from "ultils/helpers";
import { Button } from "components";
import { useSelector } from "react-redux";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import path from "ultils/path";

const { IoMdClose, HiArrowLongRight, RiDeleteBin6Line } = icons;

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);

  const handleDeleteCart = async (pid, color) => {
    const response = await apis.apiRemoveCart(pid, color);
    if (response.success) dispatch(getCurrent());
    else toast.error(response.mes, { theme: "colored" });
  };
  return (
    <div className="size-full bg-transparent flex justify-end animate-slide-left">
      <div
        className="w-1/4 bg-gray-800 grid grid-rows-[10] grid-cols-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-gray-500 row-span-1 col-span-1">
          <h1 className="uppercase text-xl p-7 text-white font-medium">
            giỏ hàng của bạn
          </h1>
          <span
            className="text-xl text-white absolute top-3 right-3 cursor-pointer"
            onClick={() =>
              dispatch(showModal({ isShowModal: false, modalChildren: null }))
            }
          >
            <IoMdClose />
          </span>
        </div>
        <section className="row-span-6 col-span-1 h-full max-h-full overflow-y-auto text-white flex flex-col gap-5 p-6">
          {(!currentCart || currentCart?.length === 0) && (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={noProduct}
                alt="No product"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          {currentCart?.length > 0 &&
            currentCart?.map((el) => (
              <div key={el._id} className="grid grid-cols-10 grid-rows-1">
                <div className="w-[78px] h-[78px] row-span-1 col-span-3">
                  <img
                    src={el.product.thumb}
                    alt={el.product?.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-full row-span-1 col-span-6 flex flex-col gap-1">
                  <span className="capitalize line-clamp-1">
                    {el.product?.title?.toLowerCase()}
                  </span>
                  {el.color && (
                    <span className="capitalize text-sm text-gray-400 line-clamp-1">
                      {el.color?.toLowerCase()}
                    </span>
                  )}
                  <span className="text-sm text-gray-400 line-clamp-1">{`Số lượng: ${el.quantity}`}</span>
                  <span className="text-sm">{`${formatMoney(
                    el.product.price
                  )} VND`}</span>
                </div>
                <div className="row-span-1 col-span-1 flex items-center justify-end">
                  <span
                    className="p-2 hover:bg-main rounded-full text-main text-lg hover:text-white transition-all cursor-pointer"
                    onClick={() => handleDeleteCart(el.product._id, el.color)}
                  >
                    <RiDeleteBin6Line />
                  </span>
                </div>
              </div>
            ))}
        </section>
        {currentCart?.length > 0 && (
          <div className="row-span-3 col-span-1 text-white border-t border-gray-500 p-6 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Tổng tiền:</span>
              <span>{`${formatMoney(
                currentCart?.reduce(
                  (sum, el) =>
                    sum + Number(el.quantity) * Number(el.product.price),
                  0
                )
              )} VND`}</span>
            </div>
            <span className="text-sm opacity-60 text-center italic">
              Vận chuyển, thuế và giảm giá được tính khi thanh toán.
            </span>
            <Button
              name={"giỏ hàng"}
              wf
              iconAfter={<HiArrowLongRight size={20} />}
              styles={"border-main"}
              handleOnClick={() => {
                navigate(`/${path.DETAIL_CART}`);
                dispatch(
                  showModal({ isShowModal: false, modalChildren: null })
                );
              }}
            />
            <Button
              name={"thanh toán"}
              wf
              iconAfter={<HiArrowLongRight size={20} />}
              styles={"border-main"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(Cart));
