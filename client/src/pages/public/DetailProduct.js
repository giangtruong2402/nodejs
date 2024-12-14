import React, { useState, useEffect, useCallback } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { apiGetProduct } from "../../apis";
import { Breadcrumb, Cart, SelectQuantity } from "../../components";
import Slider from "react-slick";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../ultils/helpers";
import Button from "./Button";
import ProductExtraInfoitem from "../../components/products/ProductExtraInfoitem";
import ProductInfomation from "../../components/products/ProductInfomation";

import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  FaShieldAlt,
  FaTruck,
  FaGift,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { showModal } from "store/appSlice";
import NoImg from "assets/logo-image.jpg";

const settings = {
  dots: false,
  infinite: false,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null); // State để lưu ảnh hiện tại
  const [quantity, setQuantity] = useState(1); // Số lượng mặc định
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    thumb: "",
    images: [],
    price: null,
    quantity: null,
    sold: null,
    color: "",
  });

  const resetData = () => {
    setProduct(null);
    setVarriant(null);
    setQuantity(1);
    setCurrentProduct({
      thumb: "",
      images: [],
      price: null,
      quantity: null,
      sold: null,
      color: "",
    });
  };

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      // Chọn ảnh đầu tiên làm ảnh mặc định khi tải dữ liệu
      setSelectedImage(response.productData?.images[0]);
    }
  };

  const handleAddToCart = async () => {
    if (!current)
      Swal.fire({
        text: "Đăng nhập trước khi thực hiện thao tác này",
        title: "Almost...",
        icon: "info",
        cancelButtonText: "Không",
        cancelButtonColor: "#ee3131",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    else {
      const response = await apis.apiUpdateCart(
        {
          color: currentProduct.color || product.color,
          quantity,
        },
        pid
      );
      if (response.success) {
        toast.success("Thêm vào giỏ hành thành công", { theme: "colored" });
        dispatch(getCurrent());
        dispatch(showModal({ isShowModal: true, modalChildren: <Cart /> }));
      } else toast.error(response.mes, { theme: "colored" });
    }
  };

  useEffect(() => {
    if (pid) {
      resetData();
      fetchProductData();
      window.scrollTo(0, 0); // Cuộn trang lên đầu
    }
  }, [pid, update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // Hàm để cập nhật ảnh khi click vào ảnh con
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Hàm để cập nhật số lượng sản phẩm
  const handleQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        thumb: product?.varriantis?.find((el) => el._id === varriant)?.thumb,
        color: product?.varriantis?.find((el) => el._id === varriant)?.color,
        images: product?.varriantis?.find((el) => el._id === varriant)?.images,
        price: product?.varriantis?.find((el) => el._id === varriant)?.price,
        quantity: product?.varriantis?.find((el) => el._id === varriant)
          ?.quantity,
        sold: product?.varriantis?.find((el) => el._id === varriant)?.sold,
      });
    } else {
      setCurrentProduct({
        thumb: product?.thumb,
        color: product?.color,
        images: product?.images || [],
        price: product?.price,
        quantity: product?.quantity,
        sold: product?.sold,
      });
    }
  }, [varriant]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex bg-gray-100">
        <div className="w-2/5 flex flex-col gap-4">
          <img
            src={selectedImage}
            alt="product"
            className="h-[458px] w-[458px] border border-gray-300 rounded-lg shadow-md object-cover"
          />
          <div className="w-[458px] border bg-white">
            <Slider
              className="image-slide flex gap-2 justify-between"
              {...settings}
            >
              <div className="w-full px-2 cursor-pointer">
                <img
                  src={currentProduct.thumb || product?.thumb || NoImg}
                  alt={product?.title}
                  className="w-[143px] h-[143px] object-contain border p-2"
                />
              </div>
              {!varriant
                ? product?.images?.map((el, index) => (
                    <div
                      key={index}
                      className="px-2 mt-2 flex justify-center items-center"
                      onClick={() => handleImageClick(el)}
                    >
                      <img
                        src={el}
                        alt="sub-product"
                        className="h-[143px] w-[143px] border border-gray-300 rounded-lg shadow-sm object-cover cursor-pointer"
                      />
                    </div>
                  ))
                : currentProduct?.images?.map((el) => (
                    <div
                      key={varriant}
                      className="w-full px-2 cursor-pointer"
                      onClick={() => handleImageClick(el)}
                    >
                      <img
                        src={el}
                        alt={product?.title}
                        className="w-[143px] h-[143px] object-contain border p-2"
                      />
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4 bg-white h-[458px] rounded-lg shadow-md">
          <div className="justify-between flex items-center">
            <h2 className="text-[30px] font-semibold">{`${formatMoney(
              formatPrice(varriant ? currentProduct?.price : product?.price)
            )} VNĐ`}</h2>
            <span className="text-sm text-main">{`Kho: ${
              varriant ? currentProduct?.quantity : product?.quantity
            }`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main">{`(Đã bán: ${
              varriant ? currentProduct.sold : product?.sold
            } cái)`}</span>
          </div>
          <ul className="text-sm text-gray-500 list-disc pl-4">
            {product?.description?.map((el, index) => (
              <li className="leading-4" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <div className="flex justify-start gap-4">
              <span className="font-medium">Color: </span>
              <span
                onClick={() => {
                  setVarriant(null);
                  setQuantity(1);
                }}
                className={`p-2 border ${
                  !varriant ? "border-main text-main" : "border-gray-500"
                } cursor-pointer uppercase`}
              >
                {product?.color || "black"}
              </span>
              {product?.varriantis?.map((el) => (
                <span
                  key={el._id}
                  onClick={() => {
                    setVarriant(el._id);
                    setQuantity(1);
                  }}
                  className={`p-2 border ${
                    varriant === el._id
                      ? "border-main text-main"
                      : "border-gray-500"
                  } cursor-pointer uppercase`}
                >
                  {el.color}
                </span>
              ))}
            </div>
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
            />
            <Button
              fw
              handleOnclick={handleAddToCart}
              className={
                ((varriant && currentProduct.quantity === 0) ||
                  product?.quantity === 0) &&
                "btn-disabled"
              }
            >
              <AiOutlineShoppingCart className="inline mr-2" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="border rounded-lg shadow-md bg-white w-1/5 ml-3 h-[458px]">
          <ul className="flex flex-col gap-4">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Bảo Đảm",
                description: "Đã Kiểm Tra Chất Lượng",
              },
              {
                icon: <FaTruck />,
                title: "Miễn Phí Vận Chuyển",
                description: "Miễn Phí Cho Tất Cả Các Sản Phẩm",
              },
              {
                icon: <FaGift />,
                title: "Thẻ Quà Tặng Đặc Biệt",
                description: "Thẻ Quà Tặng Đặc Biệt",
              },
              {
                icon: <FaUndoAlt />,
                title: "Trả Lại Miễn Phí",
                description: "Trong Vòng 7 Ngày",
              },
              {
                icon: <FaHeadset />,
                title: "Tư Vấn",
                description: "Trọn Đời 24/7/365",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 rounded-lg shadow-md"
              >
                <div className="text-2xl text-main">{item.icon}</div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-main m-auto mt-3">
        <ProductInfomation
          description={product?.description}
          totalRating={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={pid}
          rerender={rerender}
        />
      </div>
      <div className="h-[300px] w-full"></div>
    </div>
  );
};

export default DetailProduct;
