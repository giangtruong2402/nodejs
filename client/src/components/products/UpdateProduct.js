import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Loading, MarkDownEditer, Select } from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import icons from "ultils/icons";
import { getBase64, validate } from "ultils/helpers";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as apis from "apis";
import withBase from "hocs/withBase";
import { showModal } from "store/appSlice";

const { FaUpload } = icons;

const UpdateProduct = ({ productData, render, setProductData, dispatch }) => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const { categories } = useSelector((state) => state.app);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();
  // UPDATE PRODUCT
  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      finalPayload.thumb =
        data?.thumb.length === 0 ? preview.thumb : data.thumb[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      finalPayload.images =
        data.images?.length === 0 ? preview.images : data.images;
      for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiUpdateProduct(formData, productData._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success)
        Swal.fire(
          "Thành công",
          `Cập nhật sản phẩm '${response.updateProduct?.title}' thành công`,
          "success"
        ).then(() => {
          render();
          setProductData(null);
          setPreview({ thumb: "", images: [] });
        });
      else toast.error("Lỗi! Có chuyện gì đó đã xảy ra", { theme: "colored" });
    }
  };
  // MÔ TẢ
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
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
          "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
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
  // LẤY DỮ LIỆU VÀ RENDER
  useEffect(() => {
    reset({
      price: productData?.price || "",
      color: productData?.color?.toLowerCase() || "",
      title: productData?.title?.toLowerCase() || "",
      category: productData?.category || "",
      brand: productData?.brand?.toLowerCase() || "",
    });
    setPayload({
      description:
        typeof productData?.description === "object"
          ? productData?.description.join(", ")
          : productData?.description,
    });
    setPreview({
      images: productData?.images || [],
      thumb: productData?.thumb || "",
    });
  }, [productData]);
  // RENDER THUMB
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  // RENDER IMAGES
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full h-[90%]">
      <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-dashed border-gray-300 px-[30px] pb-[39px]">
        <span>{`Sửa sản phẩm '${productData.title.toLowerCase()}'`}</span>
      </h1>
      <div className="w-full h-[90%] py-4 px-10 overflow-y-scroll">
        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
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
                code: el.title,
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
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
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
            value={payload.description}
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
              <input type="file" id="thumb" {...register("thumb")} hidden />
            </div>
            {errors["thumb"] && (
              <small className="text-xs pl-2 pt-1 text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview?.thumb && (
            <div className="w-1/4 h-[300px] border border-gray-500">
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
                {...register("images")}
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
                    src={typeof el === "object" ? el.path : el}
                    alt={productData?.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          <Button
            name={"Sửa sản phẩm"}
            wf
            type={"submit"}
            styles={`mt-5 ${!isDirty && "btn-disabled"}`}
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(UpdateProduct);
