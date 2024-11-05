import express from "express";
import { createDelivery, getDeliveriesByUser, updateDeliveryDetails } from "../controllers/deliveryController.js";
import roleValidation from "../middlewares/roleValidation.js";
import { Roles } from "../middlewares/auth.js";
import { body, validationResult } from "express-validator"; // For validation

const router = express.Router();

// POST: Create a new delivery
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

// GET: Retrieve all deliveries by user ID
router.get(
  "/:userId/deliveries",
  roleValidation([Roles.Admin, Roles.User]),
  async (req, res) => {
    try {
      const deliveries = await getDeliveriesByUser(req.params.userId);
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// PUT: Update delivery details by delivery ID
router.put(
  "/:deliveryId",
  roleValidation([Roles.Admin, Roles.User]),
  [
    body("tenantAddress").optional().isString().withMessage("Tenant address must be a string"),
    body("ownerAddress").optional().isString().withMessage("Owner address must be a string"),
    body("deliveryAddress").optional().isString().withMessage("Delivery address must be a string"),
    body("deliveryStatus").optional().isString().withMessage("Delivery status must be a string"),
    body("paymentStatus").optional().isString().withMessage("Payment status must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const updatedDelivery = await updateDeliveryDetails(req.params.deliveryId, req.body);
      res.status(200).json({ message: "Delivery details updated successfully", updatedDelivery });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
