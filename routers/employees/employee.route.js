import express from 'express'
import { createPersonalDetail,updatePersonalDetail,deletePersonalDetail, getAllPersonalDetail,getIncompleteRecords } from '../../controllers/employees/employee.personal.controller.js';
import { createProfDetail,updateProRecord,deleteProRecord,resetPassword, getReportingManagerList,getAllEmployees } from '../../controllers/employees/employee.professional.controller.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';


const employeeRouter = express.Router();

employeeRouter.get('/getAll/personal',authenticate,getAllPersonalDetail)
.post('/create/personal',authenticate,createPersonalDetail)
.put('/update/personal/:empID',authenticate,updatePersonalDetail)
.delete('/delete/personal/:empID',authenticate,deletePersonalDetail)
.post('/create/professional',authenticate,createProfDetail)
.put('/update/professional/:empId',authenticate,updateProRecord)
.delete('/delete/professional/:empId',authenticate,deleteProRecord)
.put('/credentials/reset/:empId',authenticate,resetPassword)
.get('/getAllRecords',authenticate,getAllEmployees)
.get('/getIncompleteRecords',authenticate,getIncompleteRecords)
.get('/getreportingmanagers',getReportingManagerList);


export default employeeRouter;


