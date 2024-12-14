import withBase from "hocs/withBase";
import React, { memo } from "react";
import { showModal } from "store/appSlice";


const Modal = ({ children, dispatch }) => {
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="fixed inset-0 bg-overlay z-50 flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default withBase(memo(Modal));
