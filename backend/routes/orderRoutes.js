import express from "express";
import {
  addOrderItems,
  deleteOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from "../controller/orderController.js";
import { checkAdmin, checkAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(checkAuth, addOrderItems).get(checkAuth, checkAdmin,getOrders);
router.route('/myorders').get(checkAuth, getMyOrders);
router.route("/:id").get(checkAuth, getOrderById)
.delete(checkAuth,deleteOrder); 
router.route("/:id/pay").put(checkAuth, updateOrderToPaid);
router.route('/:id/deliver').put(checkAuth, checkAdmin, updateOrderToDelivered)

export default router;
