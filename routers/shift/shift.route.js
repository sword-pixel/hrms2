import express from 'express'
import { createShift,updateShift,deleteShift,getAllShifts } from '../../controllers/shift/shift.controller.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';

const shiftRouter = express.Router();


shiftRouter.get('/AllShifts',authenticate,getAllShifts)
.post('/create',authenticate,createShift)
.put('/update/:shiftId',authenticate,updateShift)
.delete('/delete/:shiftId',authenticate,deleteShift);

export default shiftRouter;