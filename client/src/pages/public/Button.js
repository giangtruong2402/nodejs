import React from "react";

const Button = ({ children ,handleOnclick, className, fw }) => {
  return (
    <button
      type="button"
      className={className ? className : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${ fw ? "w-full" : "w-fit"}`}
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
        {children}
    </button>
  );
};

export default Button;
