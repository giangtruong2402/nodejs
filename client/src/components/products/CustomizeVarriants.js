import React, { memo, useEffect, useState } from "react";
import { InputForm, Button, Loading } from "components";
import { useForm } from "react-hook-form";
import { getBase64 } from "ultils/helpers";
import icons from "ultils/icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as apis from "apis";
import withBase from "hocs/withBase";
import { showModal } from "store/appSlice";

const { FaUpload } = icons;

const CustomizeVarriants = ({
  customizeVarriants,
  render,
  setCustomizeVarriants,
  dispatch,
}) => {
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  // THÊM BIẾN THỂ
  const handlerVarriants = async (data) => {
    if (data.color === customizeVarriants.color)
      Swal.fire("Oops!", "Màu sắc không thay đổi!", "warning");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images)
        for (let image of data.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiAddVarriant(
        formData,
        customizeVarriants._id
      );
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success)
        Swal.fire(
          "Success",
          `Thêm biến thể cho sản phẩm '${customizeVarriants.title.toLowerCase()}' thành công!!!`,
          "success"
        ).then(() => {
          Swal.fire({
            text: `Bạn có muốn thêm tiếp một biến thể?`,
            showCancelButton: true,
            cancelButtonColor: "#ee3131",
            cancelButtonText: "không",
            confirmButtonText: "có",
            confirmButtonColor: "#2563EB",
            title: "Oops!",
          }).then((rs) => {
            if (!rs.isConfirmed) {
              render();
              setCustomizeVarriants(null);
              setPreview({ thumb: "", images: [] });
            } else {
              reset();
              setPreview({ thumb: "", images: [] });
            }
          });
        });
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
      price: customizeVarriants?.price,
      color: customizeVarriants?.color?.toLowerCase(),
      quantity: customizeVarriants?.quantity,
    });
  }, [customizeVarriants]);
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
        <span>{`Thên biến thể sản phẩm '${customizeVarriants.title.toLowerCase()}'`}</span>
      </h1>
      <div className="w-full h-[90%] py-4 px-10 overflow-y-scroll">
        <form
          onSubmit={handleSubmit(handlerVarriants)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex gap-4 w-full">
            <InputForm
              label={"Giá biến thể(VND)"}
              register={register}
              errors={errors}
              id={"price"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập giá biến thể..."}
              classInput={"input-bordered"}
              type={"number"}
            />
            <InputForm
              label={"Số lượng"}
              register={register}
              errors={errors}
              id={"quantity"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập số lượng biến thể..."}
              classInput={"input-bordered"}
              type={"number"}
            />
            <InputForm
              label={"Màu biến thể"}
              register={register}
              errors={errors}
              id={"color"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập màu biến thể..."}
              classInput={"input-bordered"}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
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
                  {...register("thumb", {
                    required: "Điền thông tin bắt buộc.",
                  })}
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
                      src={typeof el === "object" ? el.path : el}
                      alt={el.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            name={"Thêm biến thể sản phẩm"}
            wf
            type={"submit"}
            styles={`mt-5`}
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(memo(CustomizeVarriants));
