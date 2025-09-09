import express from 'express'
import { getHolidayList, addHoliday, deleteHoliday, uploadHolidaySheet } from "../../controllers/holiday/holiday.controller.js";
import { authenticate } from '../../helpers/authenticateEmployee.js';


const holidayRoute = express.Router()

holidayRoute.post('/getholiday', authenticate, getHolidayList)
.post('/addholiday', authenticate, addHoliday)
.post("/deleteholiday",authenticate,deleteHoliday)
.post("/uploadholidaysheet",uploadHolidaySheet)


export default holidayRoute