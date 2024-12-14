import React, { memo } from "react";
import { InputForm, Select, Button } from "components";

const roles = [
  { code: "user", value: "User" },
  { code: "admin", value: "Admin" },
];

export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];

const EditUserAdmin = ({
  dataUser,
  register,
  errors,
  isDirty,
  handleUpdate,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl uppercase font-semibold p-5 border-b border-gray-400 border-dashed">
        {`Sửa tài khoản người dùng "${dataUser?.firstname} ${dataUser?.lastname}"`}
      </h3>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="w-full flex flex-col gap-4"
      >
        <InputForm
          label={"first Name"}
          register={register}
          errors={errors}
          id={"firstname"}
          defaultValue={dataUser?.firstname}
          validate={{
            required: "Điền thông tin bắt buộc.",
          }}
          wf
          placeholder={"first Name"}
          classInput={"input-bordered"}
        />
        <InputForm
          label={"last Name"}
          register={register}
          errors={errors}
          id={"lastname"}
          defaultValue={dataUser?.lastname}
          validate={{ required: "Điền thông tin bắt buộc." }}
          wf
          placeholder={"last Name"}
          classInput={"input-bordered"}
        />
        <InputForm
          label={"email"}
          type={"email"}
          register={register}
          errors={errors}
          id={"email"}
          defaultValue={dataUser?.email}
          validate={{
            required: "Điền thông tin bắt buộc.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Địa chỉ email không hợp lệ.",
            },
          }}
          wf
          placeholder={"email"}
          classInput={"input-bordered"}
        />
        <InputForm
          label={"mobile"}
          register={register}
          errors={errors}
          id={"mobile"}
          defaultValue={dataUser?.mobile}
          validate={{
            required: "Điền thông tin bắt buộc.",
            pattern: {
              value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
              message: "Số điện thoại không hợp lệ.",
            },
          }}
          wf
          placeholder={"mobile"}
          classInput={"input-bordered"}
        />
        <div className="flex gap-5">
          <Select
            label={"Role"}
            register={register}
            errors={errors}
            id={"role"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            defaultValue={dataUser?.role}
            options={roles}
            wf
            classSelect={"select-bordered bg-gray-100"}
          />
          <Select
            label={"Status"}
            register={register}
            errors={errors}
            id={"isBlocked"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            defaultValue={dataUser?.isBlocked}
            options={blockStatus}
            wf
            classSelect={"select-bordered bg-gray-100"}
          />
        </div>
        <Button
          wf
          name={"Cập nhật"}
          type={"submit"}
          styles={!isDirty && "btn-disabled"}
        />
      </form>
    </div>
  );
};

export default memo(EditUserAdmin);
