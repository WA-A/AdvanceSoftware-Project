import { Router } from "express";
import * as ReviewController from "./Review.Controller.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Review.Roles.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Review.Validation.js";

const router = Router();

router.post(
  "/create-review/:itemId",
  auth(EndPoints.CreateReview),
  Validation(schema.CreateReviewSchema),
  ReviewController.CreateReview
);
router.put(
  "/update-review/:reviewId",
  auth(EndPoints.UpdateReview),
  Validation(schema.CreateReviewSchema),
  ReviewController.UpdateReview
);
router.delete(
  "/delete-review/:reviewId",
  auth(EndPoints.DeleteReview),
  ReviewController.DeleteReview
);
router.get(
  "/item-reviews/:itemId",
  auth(EndPoints.GetItemReviews),
  ReviewController.GetItemReviews
);

export default router;
