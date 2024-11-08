import {Router} from 'express';
import * as UserController from './User.Controller.js';
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./User.Role.js";
const router = Router();


router.get('/getuser',auth(EndPoints.GatUsers),AsyncHandler(UserController.GetUsers));
router.get('/getdatauser',auth(EndPoints.UserData),AsyncHandler(UserController.GetDataUser));

export default router ;