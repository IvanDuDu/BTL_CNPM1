import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: true,
    },
    paidAt: {
      type: Date, 
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default:  true,        //đã sửa default thành true
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order


// lỗi sinh ra khi sửa isPaid default = true thì  trang  profile không hiện hình== đang ở loading --> ko load được order
// sinh ra lỗi không nhả đơn : đơn thực hiện rồi vẫn không thoát được đơn đi và chồng lên đơn trước 
// chỉ cần có 1 đơn isPaid mà hiện lại model cũ thì vẫn không load được trang order

// chức năng cart và order vẫn đang còn nhiều xung đột 
//lí do : logic của các trang này đang hoạt động không ổn định
// cần giải quyết ở cart action và orderAction