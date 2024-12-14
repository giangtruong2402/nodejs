import icons from "./icons";
import path from "./path";

const {
  BsStarFill,
  BsStar,
  AiOutlineDashboard,
  MdGroups,
  TbBrandProducthunt,
  MdOutlineCreate,
} = icons;

export const navigation = [
  {
    id: 1,
    value: "TRANG CHỦ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "SẢN PHẨM",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BÀI VIẾT",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "DỊCH VỤ",
    path: `/${path.SERVICES}`,
  },
  {
    id: 5,
    value: "HỎI ĐÁP",
    path: `/${path.FAQ}`,
  },
];
export const colors = [
  "black",
  "gray",
  "brown",
  "white",
  "pink",
  "yellow",
  "orange",
  "green",
  "blue",
  "purple",
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Bán chạy nhất",
  },
  {
    id: 2,
    value: "title",
    text: "Theo tên, A-Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Theo tên, Z-A",
  },
  {
    id: 4,
    value: "price",
    text: "Giá, thấp đến cao",
  },
  {
    id: 5,
    value: "-price",
    text: "Giá, cao đến thấp",
  },
  {
    id: 6,
    value: "createdAt",
    text: "Ngày, cũ nhất đến mới nhất",
  },
  {
    id: 7,
    value: "-createdAt",
    text: "Ngày, mới nhất đến cũ nhất",
  },
];
// SIDEWAYS
export const Sideways = [
  {
    id: 1,
    title: "Miêu tả",
    header: "Miêu tả",
    content: [],
  },
  {
    id: 2,
    title: "Bảo hành",
    header: "Thông tin bảo hành",
    content: [
      "Bảo hành có giới hạn",
      "Bảo hành có giới hạn là không thể chuyển nhượng. Các bảo hành có giới hạn sau đây được cung cấp cho người mua lẻ ban đầu của các sản phẩm sau đây từ Ashley Furniture Industries, Inc.:",
      "Khung sử dụng trong các sản phẩm bọc vải và da",
      "Bảo hành suốt đời có giới hạn",
      "Bảo hành suốt đời có giới hạn áp dụng cho tất cả các khung sử dụng trong ghế sofa, ghế băng, ghế tình yêu, ghế bọc, ghế ottoman, bộ ghế góc và ghế giường. Ashley Furniture Industries, Inc. bảo đảm các thành phần này với bạn, người mua lẻ ban đầu, sẽ không có lỗi về vật liệu hay lỗi sản xuất.",
    ],
  },
  {
    id: 3,
    title: "Vận chuyển",
    header: "Mua hàng và giao hàng",
    content: [
      "Trước khi bạn thực hiện giao dịch, việc biết kích thước khu vực bạn định đặt đồ nội thất là rất hữu ích. Bạn cũng nên đo các cửa và hành lang mà đồ nội thất sẽ đi qua để đến vị trí cuối cùng của nó.",
      "Nhận hàng tại cửa hàng",
      "Shopify Shop yêu cầu tất cả sản phẩm phải được kiểm tra kỹ càng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất kỳ bất ngờ nào. Nhóm của chúng tôi sẽ vui lòng mở tất cả các gói hàng và hỗ trợ trong quá trình kiểm tra. Sau đó, chúng tôi sẽ niêm phong lại các gói hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo thảm bọc hoặc chăn để bảo vệ đồ vật trong suốt quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm về thiệt hại xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua có trách nhiệm đảm bảo rằng các món hàng đúng và trong tình trạng tốt khi lấy.",
      "Giao hàng",
      "Khách hàng có thể chọn ngày giao hàng tiếp theo phù hợp với lịch trình của họ. Tuy nhiên, để tối ưu hóa việc giao hàng, Shopify Shop sẽ cung cấp khung giờ giao hàng. Khách hàng sẽ không thể chọn thời gian cụ thể. Bạn sẽ được thông báo trước về khung giờ giao hàng đã được lên lịch. Vui lòng chắc chắn rằng một người lớn (trên 18 tuổi) sẽ có mặt tại nhà trong khoảng thời gian đó.",
      "Trước khi giao hàng, vui lòng dọn dẹp các đồ đạc, tranh ảnh, gương, phụ kiện,... để tránh hư hỏng. Hãy đảm bảo khu vực bạn muốn đặt đồ nội thất không bị cản trở bởi các món đồ cũ và các vật dụng khác có thể làm tắc nghẽn đường đi của đội ngũ giao hàng. Shopify Shop sẽ giao, lắp ráp và bố trí đồ nội thất mới của bạn và sẽ mang đi tất cả vật liệu đóng gói. Nhóm giao hàng không được phép di chuyển đồ đạc cũ hoặc các vật dụng gia đình khác. Nhân viên giao hàng sẽ cố gắng giao các món đồ một cách an toàn và có kiểm soát, nhưng sẽ không cố gắng đặt đồ nội thất nếu họ cảm thấy việc này sẽ gây hư hỏng cho sản phẩm hoặc ngôi nhà của bạn. Nhân viên giao hàng không thể tháo cửa, nâng đồ nội thất hoặc mang đồ lên quá 3 tầng. Thang máy phải có sẵn cho các đơn hàng giao lên tầng 4 trở lên.",
    ],
  },
  {
    id: 4,
    title: "Thanh toán",
    header: "Thanh toán và giao hàng",
    content: [
      "Trước khi bạn thực hiện giao dịch, việc biết kích thước khu vực bạn định đặt đồ nội thất là rất hữu ích. Bạn cũng nên đo các cửa và hành lang mà đồ nội thất sẽ đi qua để đến vị trí cuối cùng của nó.",
      "Nhận hàng tại cửa hàng",
      "Shopify Shop yêu cầu tất cả sản phẩm phải được kiểm tra kỹ càng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất kỳ bất ngờ nào. Nhóm của chúng tôi sẽ vui lòng mở tất cả các gói hàng và hỗ trợ trong quá trình kiểm tra. Sau đó, chúng tôi sẽ niêm phong lại các gói hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo thảm bọc hoặc chăn để bảo vệ đồ vật trong suốt quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm về thiệt hại xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua có trách nhiệm đảm bảo rằng các món hàng đúng và trong tình trạng tốt khi lấy.",
      "Giao hàng",
      "Khách hàng có thể chọn ngày giao hàng tiếp theo phù hợp với lịch trình của họ. Tuy nhiên, để tối ưu hóa việc giao hàng, Shopify Shop sẽ cung cấp khung giờ giao hàng. Khách hàng sẽ không thể chọn thời gian cụ thể. Bạn sẽ được thông báo trước về khung giờ giao hàng đã được lên lịch. Vui lòng chắc chắn rằng một người lớn (trên 18 tuổi) sẽ có mặt tại nhà trong khoảng thời gian đó.",
      "Trước khi giao hàng, vui lòng dọn dẹp các đồ đạc, tranh ảnh, gương, phụ kiện,... để tránh hư hỏng. Hãy đảm bảo khu vực bạn muốn đặt đồ nội thất không bị cản trở bởi các món đồ cũ và các vật dụng khác có thể làm tắc nghẽn đường đi của đội ngũ giao hàng. Shopify Shop sẽ giao, lắp ráp và bố trí đồ nội thất mới của bạn và sẽ mang đi tất cả vật liệu đóng gói. Nhóm giao hàng không được phép di chuyển đồ đạc cũ hoặc các vật dụng gia đình khác. Nhân viên giao hàng sẽ cố gắng giao các món đồ một cách an toàn và có kiểm soát, nhưng sẽ không cố gắng đặt đồ nội thất nếu họ cảm thấy việc này sẽ gây hư hỏng cho sản phẩm hoặc ngôi nhà của bạn. Nhân viên giao hàng không thể tháo cửa, nâng đồ nội thất hoặc mang đồ lên quá 3 tầng. Thang máy phải có sẵn cho các đơn hàng giao lên tầng 4 trở lên.",
    ],
  },
];

// RATINGS
export const ratings = [
  {
    id: 1,
    title: "Rất tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 2,
    title: "Tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 3,
    title: "Bình thường",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 4,
    title: "Tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 5,
    title: "Rất tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
];
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Bảng điều khiển",
    path: `/${path.ADMIN}/${path.DASH_BOARD}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Quản lý tài khoản người dùng",
    path: `/${path.ADMIN}/${path.MANAGER_USER}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "PAREMT",
    text: "Quản lý sản phẩm",
    icon: <TbBrandProducthunt />,
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
        subIcon: <MdOutlineCreate />,
      },
      {
        text: "Quản lý sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
        subIcon: <TbBrandProducthunt />,
      },
    ],
  },
];
