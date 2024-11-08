import { Router } from "express";
import * as DeliveryController from "./Delivery.Controller.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Delivery.Validation.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Delivery.Role.js";
import { AsyncHandler } from '../../../Utls/CatchError.js';


const router = Router();

router.post(
  "/create-delivery/:rentalId",Validation(schema.CreateDeliverySchema),auth(EndPoints.createDelivery),AsyncHandler(DeliveryController.createDelivery));

export default router;
