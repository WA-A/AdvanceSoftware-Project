import { Router } from "express";
import * as ReviewController from "./review.Controller.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Review.Roles.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Review.Validation.js";

const router = Router();

router.post(
  "/create-review/:id",
  auth(EndPoints.CreateReview),
  Validation(schema.createReview),
  ReviewController.CreateReview
);

export default router;
