import React, { memo } from "react";

const Select = ({
  label,
  options = [],
  register,
  id,
  errors,
  validate,
  defaultValue,
  wf,
  classSelect,
  classDiv,
}) => {
  return (
    <div className={`${wf && "w-full"} ${classDiv} flex flex-col`}>
      {label && (
        <label htmlFor={id} className="label label-text capitalize opacity-70">
          {label}
        </label>
      )}
      <select
        id={id}
        defaultValue={defaultValue}
        {...register(id, validate)}
        className={`select ${classSelect} w-full text-center ${
          errors[id] && "select-error"
        }`}
      >
        <option value="">-----CHOOSE-----</option>
        {options?.map((el) => (
          <option key={el.code} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs pl-2 pt-1 text-red-500">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(Select);
