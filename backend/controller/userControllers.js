import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Product from "../models/productModel.js";

//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get users for admin
// @route   GET /api/users
// @access  Private/admin
const getUsers = AsyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    Add new item to cart
// @route   POST /api/users/:id/cart
// @access  Privvate
const addItemToCart = AsyncHandler(async (req, res) => {
  const { qty } = req.body; // Lấy số lượng từ body
  const userId = req.params.userId; 
  const productId = req.params.productId; // Lấy productId từ route

  // Kiểm tra thông tin người dùng
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Kiểm tra sản phẩm có tồn tại trong database không
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    res.status(400);
    throw new Error("Product already in cart");
  }

  // Tạo sản phẩm mới với thông tin đầy đủ
  const newItem = {
    product: productId,
    name: product.name,
    price: product.price,
    image: product.image,
    qty: qty ,  // Mặc định là 1 nếu không có qty
    stock: product.countInStock,
  };

  // Thêm sản phẩm vào giỏ hàng
  user.cartItems.push(newItem);
  await user.save();

  res.status(201).json(user.cartItems);
});



// @desc    delete item from cart
// @route   DELETE /api/users/:id/cart
// @access  Private
 const deleteItemFromCart = AsyncHandler(async (req, res) => {
  const userId = req.params.userId; // Lấy userId từ route
  const productId = req.params.productId; // Lấy productId từ route

  const user = await User.findById(userId);

  if (user) {
    const itemIndex = user.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      user.cartItems.splice(itemIndex, 1); // Xóa sản phẩm khỏi cartItems
      await user.save();

      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404);
      throw new Error("Item not found in cart");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



const getMyCart = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("cartItems.product", "name price image ");
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user.cartItems);
  
});



export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteItemFromCart,
  addItemToCart,
  getMyCart,
};
