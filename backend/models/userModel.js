import mongoose from 'mongoose'
import bcryt from 'bcrypt'


//tạo thêm cartSchema ở đây

const cartSchema = mongoose.Schema(
 { name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: {                                  // trường product tham chiếu đến productId
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',},
  },

  {
  timestamps: true,
  }
);// cart đang có cấu trúc là riêng lẻ từng items bao gồm cột tên ,số lượng ,ảnh, giá , tham chiếu đến id sản phẩm , thời gian thêm vào giỏ hàng


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cartItems:[cartSchema],
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcryt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcryt.genSalt(10);
  this.password = await bcryt.hash(this.password,salt);
})

const User = mongoose.model('User', userSchema)

export default User

