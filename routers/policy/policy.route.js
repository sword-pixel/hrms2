import express from 'express'
import { addPolicy, deletePolicy, getAllPolicy, updatePolicy } from '../../controllers/policy/policy.controller.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';


const policyRouter = express.Router();

policyRouter.post('/addpolicy', authenticate, addPolicy).post('/updatepolicy', authenticate, updatePolicy).post('/deletepolicy', authenticate, deletePolicy).get('/getallpolicy', authenticate, getAllPolicy)

export default policyRouter