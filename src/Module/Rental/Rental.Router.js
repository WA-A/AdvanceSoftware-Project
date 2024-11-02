import { Router } from "express";
import * as RentalController from "./Rental.Controller.js";
import { CheckEmail } from "../../MiddleWare/CheckEmail.js";
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

export default router;

import {Router} from 'express';
import * as RentalController from '../Rental/Rental.Controller';
import { CheckEmail } from "../../MiddleWare/CheckEmail.js"; 
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from './Rental.Validation.js'
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Rental.Role.js";
import { AsyncHandler } from '../../../Utls/CatchError.js';

const router = Router();

router.post("/createrental/:itemId",Validation(schema.CreateRentalSchema),auth(EndPoints.CreateRental),RentalController.CreateRental);
router.put("/updaterental/:rentalId",Validation(schema.UpdateRentalSchema),auth(EndPoints.CreateRental),RentalController.UpdateRental);
router.get("/getrental",auth(EndPoints.CreateRental),RentalController.GetUserRentals);
router.delete("/deleterental/:RentalId",auth(EndPoints.CreateRental),RentalController.DeleteRental);





export default router;

