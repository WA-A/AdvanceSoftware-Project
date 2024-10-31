import { Router } from "express";
import * as ItemController from "./Item.Controller.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Item.Role.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Item.Validation.js";
const router = Router();

router.post(
  "/createitem",
  auth(EndPoints.CreateItem),
  Validation(schema.CreateItemSchema),
  ItemController.CreateItem
);
router.get("/getitems", auth(EndPoints.GetItems), ItemController.GetItems);
router.put(
  "/updateitem/:id",
  Validation(schema.CreateItemSchema),
  auth(EndPoints.CreateItem),
  ItemController.UpdateItem
);
router.delete(
  "/deleteitem/:id",
  auth(EndPoints.CreateItem),
  ItemController.DeleteItem
);

export default router;
