const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.jpg",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 0,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/images/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Túi Xách Công Sở Nam",
    image: "/images/sample1.jpg",
    description:
      "Đựng được máy tính xách tay 14″, Ipad 9.7″, 7.9″ & Máy tính bảng các loại",
    brand: "Gence",
    category: "Phụ kiện",
    price: 118.66,
    countInStock: 0,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Túi xách nam đẹp GB-TL31",
    image: "/images/sample2.jpg",
    description:
      "Quai xách bằng da, may chắc chắn, bền bỉ, gập đi gập lại 10 triệu lần thoải mái.Nhiều ngăn: đựng laptop, giấy tờ, sách sở, điện thoại, ví tiền, sạc máy tính, sạc dự phòng…",
    brand: "Gubag",
    category: "Phụ kiện",
    price: 27.53,
    countInStock: 12,
    rating: 4,
    numReviews: 10,
  },
  {
    name: "Túi Xách Nam Gence GCE28",
    image: "/images/sample3.jpg",
    description:
      "Túi xách da bò Mill cao cấp, đeo ngang vai, Đựng được máy tính xách tay 15.6",
    brand: "Gence",
    category: "Phụ kiện",
    price: 110.26,
    countInStock: 20,
    rating: 4,
    numReviews: 9,
  },
  {
    name: "Clutch cầm tay nam Gence CL05",
    image: "/images/sample4.jpg",
    description:
      "Clutch cầm tay, đeo vai form dáng công sở vừa điện thoại giấy tờ A4 (vừa ipab 12.9).",
    brand: "Gence",
    category: "Phụ kiện thời trang nam",
    price: 72.85,
    countInStock: 22,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Túi đeo chéo nam Gence da bò Mill TD18",
    image: "/images/sample5.jpg",
    description:
      "Túi đeo chéo, túi đeo ngang vai, đựng điện thoại, ví nhỏ, vật dụng cá nhân…",
    brand: "Gence",
    category: "Phụ kiện thời trang nam",
    price: 53.16,
    countInStock: 15,
    rating: 3.5,
    numReviews: 6,
  },
  {
    name: "Ví da thật cho nam GB-VN10",
    image: "/images/sample6.jpg",
    description:
      "Ví nam thời trang làm từ da bò kích thước 11,6 cm * 9,8 cm * 1,8 cm. Nhiều ngăn đựng tiền mặt, thẻ,…",
    brand: "Gubag",
    category: "Phụ kiện",
    price: 13.74,
    countInStock: 12,
    rating: 3,
    numReviews: 3,
  },
  {
    name: "Túi đeo chéo nam đẹp GB-TC10",
    image: "/images/sample7.jpg",
    description:
      "Túi đeo chéo vải Oxford, chống thấm, chống nước, chống xước kết hợp da PU. Kích thước: 25 x 20 x 10cm",
    brand: "Gubag",
    category: "Phụ kiện thời trang nam",
    price: 10.99,
    countInStock: 30,
    rating: 3.5,
    numReviews: 15,
  },
  {
    name: "Balo da đựng laptop GB-BL13",
    image: "/images/sample8.jpg",
    description:
      "Balo chất liệu da PU cao cấp chống nước, đường may tỉ mỉ, tinh tế. Kích thước: 30x43x17 cm",
    brand: "GuBag",
    category: "Phụ kiện",
    price: 31.46,
    countInStock: 20,
    rating: 4,
    numReviews: 20,
  },
  {
    name: "Túi đeo chéo da bò MWCB-01",
    image: "/images/sample9.jpg",
    description:
      "Túi da bò sáp MWCB-01 được làm từ chất liệu da bò sáp cao cấp mang lại nét cá tính, đặc trưng riêng cho từng người sử dụng. Chắc hẳn là món đồ không thể thiếu cho những ngày đi chơi, đi phượt",
    brand: "Giannov",
    category: "Phụ kiện thời trang nam",
    price: 72.85,
    countInStock: 22,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: "Túi đeo chéo da bò M2CB-07",
    image: "/images/sample10.jpg",
    description:
      "Túi da bò M2CB-07 được làm từ chất liệu da bò hạt cao cấp cùng tone màu hiện đại, nam tính. Chất da bò mềm mại cùng form túi vừa phải cũng là điểm cộng được nhiều người lựa chọn.",
    brand: "Giannov",
    category: "Phụ kiện thời trang nam",
    price: 64.98,
    countInStock: 9,
    rating: 3,
    numReviews: 2,
  },










];

export default products;
