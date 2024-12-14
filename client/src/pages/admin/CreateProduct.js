import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Select, MarkDownEditer, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { validate, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import icons from "ultils/icons";
import * as apis from "apis";
import Swal from "sweetalert2";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { showModal } from "store/appSlice";

const { FaUpload } = icons;

const CreateProduct = ({ dispatch, navigate }) => {
  const { categories } = useSelector((state) => state.app);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  // RESER DATA
  const resetData = () => {
    reset();
    setPayload({ description: "" });
    setPreview({ thumb: null, images: [] });
  };
  // MÔ TẢ
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  // TẠO SẢN PHẨM MỚI
  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images)
        for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success)
        Swal.fire("Success", "Thêm sản phẩm thành công!!!", "success").then(
          () => {
            resetData();
            Swal.fire({
              text: `Bạn có muốn thêm sản phẩm tiếp`,
              icon: "info",
              title: "Oops!",
              showCancelButton: true,
              cancelButtonColor: "#ee3131",
              cancelButtonText: "không",
              confirmButtonText: "có",
              confirmButtonColor: "#2563EB",
            }).then((rs) => {
              if (!rs.isConfirmed)
                navigate(`/${path.ADMIN}/${path.MANAGER_PRODUCT}`);
            });
          }
        );
      else toast.error(response.mes, { theme: "colored" });
    }
  };
  // ẢNH ĐẠI DIỆN CỦA SẢN PHẨM
  const handlePreviewThumb = async (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      toast.warning(
        "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
        { theme: "colored" }
      );
      return;
    } else {
      const base64Thumb = await getBase64(file);
      setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    }
  };
  // ẢNH SẢN PHẨM
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toast.warning(
          "Định dạng ảnh sai\nChỉ nhận định dạng file có đuôi .png hoặc .jpg",
          { theme: "colored" }
        );
        return;
      } else {
        const base64 = await getBase64(file);
        imagesPreview.push({ name: file.name, path: base64 });
      }
    }
    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("thumb").length > 0) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images").length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">tạo sản phẩm mới</span>
        </h1>
      </div>
      <div className="w-full py-4 px-10">
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="flex flex-col gap-5 w-full"
        >
          <InputForm
            label={"Tên sản phẩm"}
            register={register}
            errors={errors}
            id={"title"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            wf
            placeholder={"Nhập tên sản phẩm..."}
            classInput={"input-bordered"}
          />
          <div className="flex gap-4 w-full">
            <InputForm
              label={"Giá sản phẩm(VND)"}
              register={register}
              errors={errors}
              id={"price"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập giá sản phẩm..."}
              classInput={"input-bordered"}
              type={"number"}
            />
            <InputForm
              label={"Số lượng sản phẩm"}
              register={register}
              errors={errors}
              id={"quantity"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập số lượng sản phẩm..."}
              classInput={"input-bordered"}
              type={"number"}
            />
            <InputForm
              label={"Màu sản phẩm"}
              register={register}
              errors={errors}
              id={"color"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập màu sản phẩm..."}
              classInput={"input-bordered"}
            />
          </div>
          <div className="flex gap-4 w-full">
            <Select
              label={"loại"}
              id={"category"}
              register={register}
              errors={errors}
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              wf
              validate={{ required: "Điền thông tin bắt buộc." }}
              classSelect={"select-bordered bg-gray-100"}
            />
            <Select
              label={"thương hiệu"}
              id={"brand"}
              register={register}
              errors={errors}
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({ code: el, value: el }))}
              wf
              classSelect={"select-bordered bg-gray-100"}
            />
          </div>
          <MarkDownEditer
            name={"description"}
            changeValue={changeValue}
            label={"Miêu tả"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className="w-full flex flex-col gap-2">
            <span className="lable label-text opacity-70">
              Tải lên hình ảnh đại diện của sản phẩm
            </span>
            <div className="w-full">
              <label
                htmlFor="thumb"
                className="lable label-text flex flex-col gap-2 w-full h-[200px] border-[3px] items-center justify-center border-dashed rounded cursor-pointer"
              >
                <FaUpload size={40} />
                <span>Thêm ảnh</span>
              </label>
              <input
                type="file"
                id="thumb"
                {...register("thumb", { required: "Điền thông tin bắt buộc." })}
                hidden
              />
            </div>
            {errors["thumb"] && (
              <small className="text-xs pl-2 pt-1 text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview?.thumb && (
            <div className="w-1/4 h-[300px]">
              <img
                src={preview.thumb}
                alt="preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="w-full flex flex-col gap-2">
            <span className="lable label-text opacity-70">
              Tải lên hình ảnh của sản phẩm
            </span>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="images"
                className="lable label-text flex flex-col gap-2 w-full h-[200px] border-[3px] items-center justify-center border-dashed rounded cursor-pointer"
              >
                <FaUpload size={40} />
                <span>Thêm ảnh</span>
              </label>
              <input
                type="file"
                id="images"
                multiple
                {...register("images", {
                  required: "Điền thông tin bắt buộc.",
                })}
                hidden
              />
              {errors["images"] && (
                <small className="text-xs pl-2 pt-1 text-red-500">
                  {errors["images"]?.message}
                </small>
              )}
            </div>
          </div>
          {preview?.images.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 w-full">
              {preview?.images?.map((el, idx) => (
                <div
                  key={idx}
                  className="w-[24%] h-[300px] flex justify-center border border-gray-500"
                >
                  <img
                    key={idx}
                    src={el.path}
                    alt={el.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          <Button
            name={"Tạo sản phẩm mới"}
            wf
            type={"submit"}
            styles={`mt-5`}
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateProduct);
