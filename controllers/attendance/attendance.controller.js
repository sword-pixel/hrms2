import attendanceModel from "../../models/attendance/attendance.model.js";
import {format } from 'date-fns-tz'
import attendanceRequestModel from "../../models/attendance/attendanceRequest.model.js";


const getEmployeeAttendance = async (request,response)=>{
  try{
    const {employeeId,date} = request.query;

    // console.log('date===>',new Date(date));
    const givendate = new Date(date);

    let startDate = new Date(givendate.getFullYear(), givendate.getMonth(), 1);
    let endDate = new Date(givendate.getFullYear(), givendate.getMonth()+ 1, 0);
  
    startDate= format(startDate, 'yyyy-MM-dd');  // Using date-fns format function
    endDate= format(endDate, 'yyyy-MM-dd');  // Using date-fns format function
    // console.log('startDate',startDate,'endDate',endDate);
    // console.log(new Date(startDate),new Date(endDate));
    if(!employeeId || !date)
      return response.status(400).json({ error: 'Missing required parameter: param' });

    const attendanceData = await attendanceModel.find({employeeId,isActive:true,date:{$gte:new Date(startDate),$lte:new Date(endDate)}}).sort({ date: 1 }).lean(true);
    console.log('date ==->',attendanceData);
    if(attendanceData.length < 1)
       return response.status(204).json({data:attendanceData,success:true,message:'No Records Found for the Employee'});

    const checkAttendanceRequest = await attendanceRequestModel.find({employeeId,date:{$in:attendanceData.map((value)=>new Date(value.date))}}).select('date status').lean(true);
    const mappingArray = new Map(checkAttendanceRequest.map((value)=>([new Date(value.date).toISOString().split('T')[0],value])));
    const finalData = attendanceData.map((value)=>{
      return ({...value,related : mappingArray.get(new Date(value.date).toISOString().split('T')[0]) || null ,_id:value._id});
    });
    response.status(200).json({data:finalData,success:true,message:'records fetched successfully'});
  }catch(error){
    response.status(500).json({message: error.message,data: {},success: false});
  }
}

const getEmployeeAttendancebackup = async (request,response)=>{
  try{
    const {employeeId,date} = request.query;

    console.log('date===>',new Date(date));
    const givendate = new Date(date);

    let startDate = new Date(givendate.getFullYear(), givendate.getMonth(), 1);
    let endDate = new Date(givendate.getFullYear(), givendate.getMonth()+ 1, 0);
  
    startDate= format(startDate, 'yyyy-MM-dd');  // Using date-fns format function
    endDate= format(endDate, 'yyyy-MM-dd');  // Using date-fns format function
    // console.log('startDate',startDate,'endDate',endDate);
    // console.log(new Date(startDate),new Date(endDate));
    if(!employeeId || !date)
      return response.status(400).json({ error: 'Missing required parameter: param' });

    const attendanceData = await attendanceModel.find({employeeId,isActive:true,date:{$gte:new Date(startDate),$lte:new Date(endDate)}},{ sort: { date: 1 } });

    console.log(employeeId,'attendance data',attendanceData);

    if(attendanceData.length < 1)
       return response.status(204).json({data:attendanceData,success:true,message:'No Records Found for the Employee'});

    response.status(200).json({data:attendanceData,success:true,message:'records fetched successfully'});
    
  }catch(error){
    response.status(500).json({message: error.message,data: {},success: false});
  }
}



export {getEmployeeAttendance}