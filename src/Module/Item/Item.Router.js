import {Router} from 'express';
import * as ItemController from './Item.Controller.js';
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Item.Role.js";
const router = Router();


router.post('/createitem',auth(EndPoints.CreateItem),ItemController.CreateItem);
router.get('/getownitems',auth(EndPoints.GetItems),ItemController.GetOwnerItems);

export default router ;