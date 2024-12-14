import React, { useEffect, useState, useCallback } from "react";
import {
  CustomizeVarriants,
  InputForm,
  Pagination,
  UpdateProduct,
} from "components";
import * as apis from "apis";
import icons from "ultils/icons";
import moment from "moment";
import { formatMoney } from "ultils/helpers";
import { createSearchParams, useSearchParams } from "react-router-dom";
import NoProduct from "assets/logo-image.jpg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useDebounce from "hooks/useDebounce";
import withBase from "hocs/withBase";

const {
  FaRegEdit,
  RiDeleteBin6Line,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
  IoMdClose,
  BiCustomize,
} = icons;

const ManageProduct = ({ navigate, location }) => {
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [editElm, setEditElm] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVarriants, setCustomizeVarriants] = useState(null);
  const [sort, setSort] = useState(null);
  const {
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  // CALL API PRODUCT
  const queryDecounce = useDebounce(watch("q"), 800);
  const fetchProducts = async (params) => {
    const response = await apis.apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setProduct(response);
  };
  // XÓA SẢN PHẨM
  const handleDelete = (data) => {
    Swal.fire({
      text: `Bạn có chắc muốn xóa sản phẩm '${data?.title}' này?`,
      showCancelButton: true,
      cancelButtonColor: "#ee3131",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
      confirmButtonColor: "#2563EB",
      title: "Oops!",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apis.apiDeleteProduct(data?._id);
        if (response.success)
          Swal.fire(
            "Success",
            `Xóa thành công sản phẩm '${data?.title}'`,
            "success"
          ).then(() => {
            setEditElm(null);
            render();
          });
        else toast.error(response.mes);
      }
    });
  };
  // RENDER CLIENT
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // SORT PRODUCT TO NAVIGATE
  useEffect(() => {
    if (queryDecounce)
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDecounce }).toString(),
      });
    else
      navigate({
        pathname: location.pathname,
      });
  }, [queryDecounce]);
  // RENDER PRODUCT
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort) queries.sort = sort;
    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [params, update, sort]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      {/* UPDATE PRODUCT */}
      {editElm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-20 flex justify-center items-center">
          <div className="w-[70%] h-[90%] bg-white flex flex-col gap-4 p-4 items-center justify-center rounded-md relative animate-scale-in-center">
            <span
              onClick={() => setEditElm(null)}
              className="absolute top-1 right-1 text-2xl cursor-pointer"
            >
              <IoMdClose />
            </span>
            <UpdateProduct
              productData={editElm}
              render={render}
              setProductData={setEditElm}
            />
          </div>
        </div>
      )}
      {/* CUSTOMIZE VARRIANTS */}
      {customizeVarriants && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-20 flex justify-center items-center">
          <div className="w-[70%] h-[90%] bg-white flex flex-col gap-4 p-4 items-center justify-center rounded-md relative animate-scale-in-center">
            <span
              onClick={() => setCustomizeVarriants(null)}
              className="absolute top-1 right-1 text-2xl cursor-pointer"
            >
              <IoMdClose />
            </span>
            <CustomizeVarriants
              customizeVarriants={customizeVarriants}
              render={render}
              setCustomizeVarriants={setCustomizeVarriants}
            />
          </div>
        </div>
      )}
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">Quản lý sản phẩm</span>
        </h1>
      </div>
      <div className="w-full py-4 px-10">
        <div className="flex justify-between py-4">
          <div className="flex items-center justify-center text-2xl">
            {product?.products?.length > 0 && (
              <>
                {(!sort || sort === "createdAt") && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setSort("-createdAt")}
                  >
                    <FaArrowDownShortWide />
                  </span>
                )}
                {sort === "-createdAt" && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setSort("createdAt")}
                  >
                    <FaArrowUpWideShort />
                  </span>
                )}
              </>
            )}
          </div>
          <form className="w-2/5 relative">
            <InputForm
              id={"q"}
              register={register}
              errors={errors}
              placeholder={"Tìm kiếm sản phẩm theo tên, giá..."}
              classInput={"input-bordered"}
              wf
            />
            {watch("q")?.length > 0 && (
              <span
                className="absolute top-3 right-1 text-2xl cursor-pointer"
                onClick={() => reset()}
              >
                <IoMdClose />
              </span>
            )}
          </form>
        </div>
        {product?.products?.length > 0 && (
          <table className="table table-zebra mb-5 bg-slate-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th>Thumb</th>
                <th className="w-[150px]">Title</th>
                <th>Brand</th>
                <th>Price(VND)</th>
                <th>Color</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Rating</th>
                <th>Varriants</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product?.products?.map((el) => (
                <tr key={el._id}>
                  <td>
                    <div className="w-[60px] h-[60px]">
                      <img
                        src={el.thumb || NoProduct}
                        alt={el.title}
                        className="w-full h-full object-contain p-[2px]"
                      />
                    </div>
                  </td>
                  <td className="w-[150px]">
                    <span className="capitalize line-clamp-2">
                      {el.title.toLowerCase()}
                    </span>
                  </td>
                  <td>
                    <span className="capitalize">{el.brand.toLowerCase()}</span>
                  </td>
                  <td>
                    <span>{formatMoney(el.price)}</span>
                  </td>
                  <td>
                    <span className="capitalize line-clamp-2">
                      {el.color ? el.color?.toLowerCase() : "no color"}
                    </span>
                  </td>
                  <td>
                    <span>{el.category}</span>
                  </td>
                  <td>
                    <span>{el.quantity}</span>
                  </td>
                  <td>
                    <span>{el.sold}</span>
                  </td>
                  <td>
                    <span>{el.totalRatings}</span>
                  </td>
                  <td>
                    <span>{el.varriantis.length}</span>
                  </td>
                  <td>
                    <span>
                      {moment(el.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </td>
                  <td>
                    <span>
                      {moment(el.updatedAt).format("DD-MM-YYYY")}
                    </span>
                  </td>
                  <td className="flex gap-2 capitalize text-blue-500">
                    <span
                      title="Sửa sản phẩm"
                      className="hover:underline cursor-pointer text-lg text-yellow-500"
                      onClick={() => setEditElm(el)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      className="hover:underline cursor-pointer text-lg text-main"
                      title="Xóa sản phẩm"
                      onClick={() => handleDelete(el)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                    <span
                      className="hover:underline cursor-pointer text-lg text-blue-500"
                      title="Biến thể"
                      onClick={() => setCustomizeVarriants(el)}
                    >
                      <BiCustomize />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {product?.products.length <= 0 && (
          <div className="flex flex-col gap-5 justify-center items-center p-20">
            <img
              src={NoProduct}
              alt="No Product"
              className="w-[300px] object-contain opacity-60"
            />
            <span className="text-xl font-semibold opacity-60">No Product</span>
          </div>
        )}
        {product?.counts > 30 && (
          <Pagination totalCount={product?.counts} />
        )}
      </div>
    </div>
  );
};

export default withBase(ManageProduct);
