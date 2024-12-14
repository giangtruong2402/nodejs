import React, { memo } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  wf,
  classDiv,
  classInput,
  defaultValue,
}) => {
  return (
    <div className={`${wf && "w-full"} flex flex-col ${classDiv}`}>
      {label && (
        <label htmlFor={id} className="label label-text capitalize opacity-70">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={`input w-full bg-gray-100 ${classInput} ${
          errors[id] && "input-error"
        } placeholder:text-sm`}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs pl-2 pt-1 text-red-500">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
