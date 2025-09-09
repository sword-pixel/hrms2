import express from 'express';
import { loginEmployee,logOutEmployee,processPasswordRequest,resetPassword } from '../../controllers/authorization/auth.controller.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';

const authRouter = express.Router();


authRouter.post('/login',loginEmployee)
.get('/logout',logOutEmployee)
.post('/forget-password',processPasswordRequest)
.patch('/reset-password/:empId/:token',resetPassword);


export default authRouter;


