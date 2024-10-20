import {Router} from 'express';
import * as AuthController from '../Auth/Auth.Controller.js';
import { CheckEmail } from "../../../MiddleWare/CheckEmail.js"; 
import { Validation } from "../../../MiddleWare/Validation.js";
import * as schema from './Auth.Validation.js'

const router = Router();

router.get('/',AuthController.GetAuth);
router.post('/signup',Validation(schema.RegisterSchema),CheckEmail,AuthController.Register);
router.post('/signin',Validation(schema.LoginSchema),AuthController.Login);
router.patch('/sendcode',Validation(schema.SendCodeSchema),AuthController.SendCode); 
router.patch('/forgetpassword',Validation(schema.ForgetPasswordSchema),AuthController.ForgotPassword); 



export default router;