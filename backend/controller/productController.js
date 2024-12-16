import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = AsyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json();
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = AsyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;

  if (!name || !price || !image || !brand || !category || countInStock === undefined) {
    res.status(400);
    throw new Error("All fields are required");
  }
  
  const product = new Product({
    name,
    price,
    user: req.user._id, 
    image,
    brand,
    category,
    countInStock,
    numReviews:0,
    description: description || "",
  });

  // Save the product to the database
  const createdProduct = await product.save();

  // Respond with the created product
  res.status(201).json(createdProduct);
});


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create new review
//@route POST /api/products/:id/reviews
//@acess Private

const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);    // tìm id sản phẩm

  if (product) {   // nếu còn sản phẩm 
    const alreadyReviewed = product.reviews.find((review) => {    //kiểm tra xem người dùng đã review sản phẩm này chưa
      review.user.toString() === req.user._id.toString();
    });

    if (alreadyReviewed) {    // nếu mà rồi thì không cho phép review nữa
      res.status(400);
      throw new Error("Product already reviewed");   
    }
      // nếu chưa thì tạo review , lấy thông số tên user, số đánh giá , comment và id của user
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
  // push review đó vào trong mục reviews của product
    product.reviews.push(review);

    product.numReviews = product.reviews.length;   // lấy số lượng review

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;     // chấm điểm trung bình

    await product.save();
    res.status(201).json({ message: "Review added" });    // sace lại sau khi push
  } else {
    throw new Error("Product Not Found");
  }
});

export const updateProductStock = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.countInStock -= req.body.qty;

    if (product.countInStock < 0) {
      res.status(400);
      throw new Error(`${product.name} is out of stock`);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct
};

