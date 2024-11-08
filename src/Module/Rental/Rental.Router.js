import { Router } from "express";
import * as RentalController from "./Rental.Controller.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Rental.Validation.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Rental.Role.js";

const router = Router();

router.post(
  "/create-rental/:itemId",
  Validation(schema.CreateRentalSchema),
  auth(EndPoints.CreateRental),
  RentalController.CreateRental
);
router.put(
  "/update-rental/:rentalId",
  Validation(schema.UpdateRentalSchema),
  auth(EndPoints.CreateRental),
  RentalController.UpdateRental
);
router.get(
  "/get-rental",
  auth(EndPoints.GetRental),
  RentalController.GetUserRentals
);
router.delete(
  "/delete-rental/:rentalId",
  auth(EndPoints.CreateRental),
  RentalController.DeleteRental
);
router.put(
  "/confirm-rental/:rentalId",
  auth(EndPoints.ConfirmRental),
  RentalController.ConfirmRentalByOwner
);

router.post(
  "/create-rental-damage/:rentalId",
  auth(EndPoints.ConfirmRental),
  RentalController.CreatDamageAmount
);

export default router;
