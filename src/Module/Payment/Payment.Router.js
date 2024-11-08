import { Router } from "express";
import * as PaymentController from "./Payment.Controller.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Payment.Role.js";

const router = Router();

router.post(
  "/create-payment/:rentalId",
  auth(EndPoints.CreatePayment),
  PaymentController.CreatePayment
  //PaymentController.SendPaymentNotification
);

router.get(
  "/payment-success",
  auth(EndPoints.GetPayment),
  PaymentController.PaymentSuccess
);

router.post(
  "/create-payment-for-damage/:rentalId",
  auth(EndPoints.CreatePayment),
  PaymentController.CreatePaymentForPreviousDamages
  //PaymentController.SendPaymentNotification
);

router.get(
  "/payment-for-damage-success",
  auth(EndPoints.GetPayment),
  PaymentController.PaymentSuccessForPreviousDamages
);

export default router;
