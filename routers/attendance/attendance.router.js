import express from 'express'
import { authenticate } from '../../helpers/authenticateEmployee.js';
import { getEmployeeAttendance } from '../../controllers/attendance/attendance.controller.js';
import { createAttendanceRequest,approveRequest,getAttendanceRequest } from '../../controllers/attendance/attendanceRequest.controller.js';

const attendanceRouter = express.Router();


attendanceRouter.get('/getAttendance',authenticate,getEmployeeAttendance)
.post('/createRequest',authenticate,createAttendanceRequest)
.put('/updateRequest/:id',authenticate,approveRequest)
.get('/getRequest',authenticate,getAttendanceRequest);



export default attendanceRouter;




