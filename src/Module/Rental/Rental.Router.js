import { Router } from "express";
import * as RentalController from "./Rental.Controller.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Rental.Validation.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Rental.Role.js";

const router = Router();

router.post("/create-rental/:itemId",Validation(schema.CreateRentalSchema),auth(EndPoints.CreateRental),AsyncHandler(RentalController.CreateRental));
router.put("/update-rental/:rentalId",Validation(schema.UpdateRentalSchema),auth(EndPoints.CreateRental),AsyncHandler(RentalController.UpdateRental));
router.get("/get-rental",auth(EndPoints.GetRental),AsyncHandler(RentalController.GetUserRentals));
router.delete("/delete-rental/:rentalId",auth(EndPoints.CreateRental),AsyncHandler(RentalController.DeleteRental));
router.put("/confirm-rental/:rentalId",auth(EndPoints.ConfirmRental),AsyncHandler(RentalController.ConfirmRentalByOwner));
router.post("/create-rental-damage/:rentalId",auth(EndPoints.ConfirmRental),AsyncHandler(RentalController.CreatDamageAmount));

export default router;
