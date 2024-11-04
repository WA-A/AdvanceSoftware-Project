import express from "express";
import { createDelivery } from "../controllers/deliveryController.js";
import roleValidation from "../middlewares/roleValidation.js";
import { Roles } from "../middlewares/auth.js";
import { body, validationResult } from "express-validator"; // For validation
import { validateDelivery } from '../middlewares/deliveryValidation.js'; 

const router = express.Router();


router.post(
  "/deliveries",
  roleValidation([Roles.Admin, Roles.User]),
  [
    body("rentalId").isInt().withMessage("Rental ID must be an integer"),
    body("userId").isInt().withMessage("User ID must be an integer"),
    body("tenantAddress").isString().notEmpty().withMessage("Tenant address is required"),
    body("ownerAddress").isString().notEmpty().withMessage("Owner address is required"),
    body("deliveryAddress").isString().notEmpty().withMessage("Delivery address is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createDelivery
);

export default router;
