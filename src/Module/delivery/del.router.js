import express from "express";
import { createDelivery } from "../controllers/DeliveryController.js";
import auth from "../middlewares/auth.js";
import roleValidation from "../middlewares/roleValidation.js";
import validateDelivery from "../middlewares/validateDelivery.js";
import { Roles } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/deliveries",
  auth([Roles.Admin, Roles.User]), // First, ensure the user is authenticated
  roleValidation([Roles.Admin, Roles.User]), // Then, check if they have the correct role
  validateDelivery, // Validation for required fields
  createDelivery // Controller function to handle delivery creation
);

export default router;
