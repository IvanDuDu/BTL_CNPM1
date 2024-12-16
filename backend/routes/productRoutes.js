import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductStock,
} from "../controller/productController.js";
import { checkAdmin, checkAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(checkAuth, checkAdmin, deleteProduct)
  .put(checkAuth, checkAdmin, updateProduct);

router.route("/:id/reviews").post(checkAuth, createProductReview);

router.put("/:id/update-stock", checkAuth, updateProductStock);

// review chỉ sử dụng phuognw thức post vào routes chỉ đi vào trường reviews
export default router;
