import {Router} from 'express';
import * as ItemController from './Item.Controller.js';
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Item.Role.js";
const router = Router();


router.post('/createitem',auth(EndPoints.CreateItem),ItemController.CreateItem);
router.get('/getowneritems',auth(EndPoints.GetItems),ItemController.GetItems);
router.put('/updateitem/:idItem',auth(EndPoints.CreateItem),ItemController.UpdateItem);
router.delete('/deleteitem/:idItem',auth(EndPoints.CreateItem),ItemController.DeleteItem);


export default router ;