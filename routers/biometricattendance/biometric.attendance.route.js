import express from 'express'
import { addBiometricDevice, fetchAttendance, getBiometricDevice,getAttendanceFromDevice } from '../../controllers/biometricattendance/biometric.attendance.controller.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';

const biometricRouter = express.Router();

  

biometricRouter.post('/attendance',authenticate, fetchAttendance).post('/addbiometricdevice', authenticate , addBiometricDevice).get('/getbiometricdevice', authenticate, getBiometricDevice).post('/loadAttendance',getAttendanceFromDevice);


export default biometricRouter;



