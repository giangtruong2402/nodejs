import React, { memo } from "react";

const InputField = ({
  value,
  setValue,
  namekey,
  type = "text",
  placeholder,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() !== "" && (
        <label
          className="text-[10px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1"
          htmlFor={namekey}
        >
          {placeholder}
        </label>
      )}
      <input
        type={type}
        className="w-full p-2 border rounded-sm px-4 my-2 placeholder:text-sm placeholder:italic outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [namekey]: e.target.value }))
        }
      />
    </div>
  );
};

export default memo(InputField);
