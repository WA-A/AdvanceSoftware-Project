import {Router} from 'express';
import * as AuthController from '../Auth/Auth.Controller.js';
import { CheckEmail } from "../../../MiddleWare/CheckEmail.js"; 
const router = Router();

router.get('/',AuthController.GetAuth);
router.post('/signup',CheckEmail,AuthController.Register);
router.post('/signin',AuthController.Login);
router.patch('/sendcode',AuthController.SendCode);
router.patch('/forgetpassword',AuthController.ForgotPassword);



export default router;