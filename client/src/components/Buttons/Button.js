import React, { memo } from "react";

const Button = ({
  name,
  handleOnclick,
  style,
  iconBefor,
  iconAfter,
  fw,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      {iconBefor}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
