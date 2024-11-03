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

router.post("/webhooks", PaymentController.Webhooks);

router.get(
  "/get-payment-status/:paymentId",
  auth(EndPoints.GetPaymentStatus),
  PaymentController.GetPaymentStatus
  // PaymentController.SendPaymentStatusNotification
  // If you want to send email or SMS notification, you need to add corresponding code here
);

export default router;
