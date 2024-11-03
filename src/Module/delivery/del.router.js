import express from "express";
import {
  CreateDelivery,
  UpdateDeliveryStatus,
  GetUserDeliveries,
  DeleteDelivery,
} from "../Controllers/deliveryController.js"; 
const router = express.Router();

// Routes
router.post("/deliveries/:rentalId", CreateDelivery);
router.put("/deliveries/:deliveryId/status", UpdateDeliveryStatus);
router.get("/deliveries", GetUserDeliveries);
router.delete("/deliveries/:deliveryId", DeleteDelivery);

export default router;
