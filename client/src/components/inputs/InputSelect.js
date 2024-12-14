import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={(e) => changeValue(e.target.value)}
        className="select select-bordered w-full text-sm"
      >
        <option value="">Chọn</option>
        {options?.map((el) => (
          <option key={el.id} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(InputSelect);
