import {Router} from 'express';
import * as AuthController from '../Auth/Auth.Controller.js';
const router = Router();

router.get('/',AuthController.GetAuth);
router.post('/signup',AuthController.Register);
router.post('/signin',AuthController.Login);
router.patch('/sendcode',AuthController.SendCode);
router.patch('/forgotpassword',AuthController.ForgotPassword);



export default router;