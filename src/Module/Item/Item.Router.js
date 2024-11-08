import { Router } from "express";
import multer from 'multer';
import * as ItemController from "./Item.Controller.js";
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Item.Role.js";
import { validateSchema, Validation } from "../../MiddleWare/Validation.js";
import * as schema from "./Item.Validation.js";
import { storage } from "../../MiddleWare/imageUpload.js";
import { AsyncHandler } from '../../../Utls/CatchError.js';


const router = Router();
const upload = multer({ storage });

router.post("/createitem",upload.single("image"),auth(EndPoints.CreateItem),validateSchema(schema.CreateItemSchema),AsyncHandler(ItemController.CreateItem));
router.get("/getitems", auth(EndPoints.GetItems), AsyncHandler(ItemController.GetItems));
router.put("/updateitem/:id",Validation(schema.CreateItemSchema),auth(EndPoints.CreateItem),AsyncHandler(ItemController.UpdateItem));
router.delete("/deleteitem/:id",auth(EndPoints.CreateItem),AsyncHandler(ItemController.DeleteItem));

export default router;
