import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteItemFromCart,
  addItemToCart,
  getMyCart,
} from "../controller/userControllers.js";
import { checkAuth, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for user registration and admin management
router.route("/").post(registerUser).get(checkAuth, checkAdmin, getUsers);

// Route for login
router.route("/login").post(authUser);

// Routes for user profile management
router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .put(checkAuth, updateUserProfile);

// Routes for managing individual users
router
  .route("/:id")
  .delete(checkAuth, checkAdmin, deleteUser)
  .get(checkAuth, checkAdmin, getUserById)
  .put(checkAuth, checkAdmin, updateUser);

// Routes for cart management
router.route("/cart/:id").get(checkAuth, getMyCart);
router
  .route("/:userId/cart/:productId")
  .post(checkAuth, addItemToCart)
  .delete(checkAuth, deleteItemFromCart);

export default router;
