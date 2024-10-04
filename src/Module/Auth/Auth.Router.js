import {Router} from 'express';
import * as AuthController from '../Auth/Auth.Controller.js';
import { CheckEmail } from "../../../MiddleWare/CheckEmail.js"; 
import { Validation } from "../../../MiddleWare/Validation.js";
import * as schema from './Auth.Validation.js'

const router = Router();

router.get('/',AuthController.GetAuth);
router.post('/signup',Validation(schema.RegisterSchema),CheckEmail,AuthController.Register);
router.post('/signin',Validation(schema.RegisterSchema),AuthController.Login);
router.patch('/sendcode',Validation(schema.RegisterSchema),AuthController.SendCode);
router.patch('/forgetpassword',Validation(schema.RegisterSchema),AuthController.ForgotPassword);



export default router;