import {Router} from 'express';
import * as ItemController from './Item.Controller.js';
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./Item.Role.js";
const router = Router();


router.post('/createitem',auth(EndPoints.CreateItem),ItemController.CreateItem);

export default router ;