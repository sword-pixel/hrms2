import ZKLib  from 'node-zklib';
import biometricModel from '../../models/biometric/biometric.model.js';
import attendanceModel from '../../models/attendance/attendance.model.js';
import employeeProfessionalModel from '../../models/employee/employeeProfessional.model.js';
import {parse,isWithinInterval,parseISO,subDays  } from 'date-fns';
import  moment from 'moment-timezone';
import shiftModel from '../../models/attendance/shift.model.js';
import leaveModel from '../../models/attendance/leave.model.js';


const fetchAttendance = async (request,response)=>{
        
      try{
        const {role} = request;
        const {ip,port} = request.body;

        if(role.toLowerCase() !=='admin')
          return response.status(403).json({ "error": "Access denied. You do not have permission to perform this action.","status":false });

        if(!ip || !port)
          return response.status(400).json({"error":"Bad Request Try Again!",success: false});
        
        const attendanceData = await  attendanceModel.findOne().sort({ updatedAt: -1 });

        return response.status(200).json(attendanceData);
      
      // condition to check device configured or not 
      //  if(attendanceData.length)
      //     return response.status(400).json({"error":"Device Already Connected",success: false});

      // static user 
      // const employeeRecords = await employeeProfessionalModel.find().select('employeeId');
      const employeeRecords = await employeeProfessionalModel.find().populate('shift','cumulativeStartTime startTime').select('employeeId shift');
     
        const userId = [{employeeId : '1029',shift:'night'}];
        // const userId = employeeRecords;

        let zkInstance = new ZKLib(ip, port, 5200, 5000);
        await zkInstance.createSocket();

        // const attendanceLog = await zkInstance.getUsers();
        const attendanceLog =  await zkInstance.getAttendances();

      //  console.log(attendanceLog);

      

        for(const userids of userId) {
          
          const attendanceList = attendanceLog.data.filter((value)=>(
            
            userids.employeeId === value.deviceUserId
          ));
          
          const attendanceRecords = await groupAttendance(attendanceList, userids);
          return response.status(200).json(attendanceRecords);
          console.log(attendanceRecords);
          // const {date}
          // attendance insertion in the db

          

        }        
        await zkInstance.disconnect();
        
        const documentPresent = await attendanceModel.countDocuments();

        if(documentPresent < 1)
          throw new Error('No Document Insertd');
        
        response.status(200).json({"message":`${documentPresent} document Inserted`,success: true});

      }catch(error){
        console.log(error.message);
        response.status(500).json({"error":"Internal Server Error",success: false});
      }
}

const getAttendanceFromDevice= async ()=>{

  const attendanceData = await  attendanceModel.find();
  const employeeRecords = await employeeProfessionalModel.find().populate('shift','cumulativeStartTime startTime').select('employeeId shift');
  const userId = [{employeeId : '1029',shift:'night'}];
  // const userId = employeeRecords;
  let zkInstance = new ZKLib(ip, port, 5200, 5000);
  await zkInstance.createSocket();
  // const attendanceLog = await zkInstance.getUsers();
  const attendanceLog =  await zkInstance.getAttendances();

  for(const userids of userId) {
    const attendanceList = attendanceLog.data.filter((value)=>(
      userids.employeeId === value.deviceUserId
    ));

    return attendanceList;
    
    const attendanceRecords = await groupAttendance(attendanceList, userids);
  }        
  await zkInstance.disconnect();
  const documentPresent = await attendanceModel.countDocuments();
  return documentPresent;
}

const groupAttendance = async (attendanceList,empid)=>{
        const today = new Date();
        

      const attendanceListObj = {}; // formted attendance Object List

      attendanceList.forEach((object)=>{
        // console.log(object.recordTime);
        const dateString = object.recordTime.toISOString();
        const newDate = moment.utc(dateString).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A');
        console.log('istDate',newDate);
        let date= newDate.split(/[ ]/)[0];
        console.log('splittt',date);
        // const newDate=  date.split('T')[0];
        if(!attendanceListObj[date])
          attendanceListObj[date] = [];
        
        if(empid.shift==='night'){
          if(newDate.includes('AM')){
            const dateConversion = new Date(date); // Original date
            const prevDate = subDays(dateConversion, 1).toISOString().split(/[T]/)[0];
            date = prevDate;
          }
        }
          attendanceListObj[date].push(newDate);
      });

      // return attendanceListObj;

        const dataaa = [];
 // to get First and last punch object of the day of employee
    const finalAttendanceObject = Object.entries(attendanceListObj).map(async ([date,punch])=>{
    // const sortedPunch =  punch.sort((a,b)=>{ return (new Date(a.recordTime)-new Date(b.recordTime))});
    if(punch.length > 0){
        let  checkInTime  = punch[0];
        let  checkOutTime = punch[punch.length-1];

        // Converting to local time in ISO format

        let InTime = new Date(checkInTime).toLocaleTimeString('en-US', { hour12: true });
        let OutTime = new Date(checkOutTime).toLocaleTimeString('en-US', { hour12: true });

        const differenceInMilliseconds = new Date(checkOutTime) - new Date(checkInTime);
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const hours = Math.floor(differenceInSeconds / 3600);
        
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const totalHours = `${hours}:${minutes}`;

        // let graceTime = empid['shift'].cumulativeStartTime;
        // let startTime = empid['shift'].startTime;

          
        //   const time1 = parse(startTime,"hh:mm:ss a",new Date());
        //   const time2 = parse(graceTime,"hh:mm:ss a",new Date());
        //   const time3 = parse(InTime ,"hh:mm:ss a",new Date());

        

        //   // 'Present', 'Absent', 'Leave', 'Half-Day','Late-In'
        //   if(!InTime){
        //     const leaves = await leaveModel.find();
        //     const leaveToday = leaves.filter((value)=>{
        //       const startdate =  new Date();
        //       value.employee ===empid._id && value.status==='Approved' && isWithinInterval(today,{start:new Date(),end:new Date()})
        //     })
        //   }
          

        //   let status = 'Absent';
        //   if(isWithinInterval(time3, { start: time1, end: time2 })){
        //     status = 'Present';
        //   }else{

        //   }

        
      
        dataaa.push({
        employeeId : empid.employeeId,
        date,
        checkInTime : InTime,
        checkOutTime : OutTime,
        totalHours

      });
            
        // const createAttendance = await   attendanceModel.create({
        //   employeeId : empid._id,
        //   date,
        //   checkInTime : InTime,
        //   checkOutTime : OutTime,
        //   totalHours

        // });

        // await createAttendance.save();
    }
  })
  console.log(finalAttendanceObject);
   return dataaa;
}


const addBiometricDevice = async (req,res) =>{

  try {

    const { deviceName, ipAddress, port, connectionType, status, isActive, method, id } = req.body;

    // const adminId = {_id:"672b0a57de2599055050bbfd",type:"admin"};
    const adminId = {_id:"6729ff2f40e30ad8370fa0a6",type:"admin"};

    if(adminId.type !== 'admin'){
      return res.status(400).json({success:false,message:`Permission denied: You are not authorized to ${method} a biometric device.`})
    }

    if(method === 'add'){
      const deviceExist = await biometricModel.findOne({ipAddress,port,isActive:true,adminId:adminId._id})

      if(deviceExist){
        return res.status(200).json({success:false,error:"Device Already Exist"})
      }

      const newbiometricModel = new biometricModel({ deviceName, ipAddress, port, connectionType, status, isActive,adminId: adminId._id });
      await newbiometricModel.save();

      return res.status(200).json({success:true,message:"Device Added Successfully."})
    }else if(method === 'update' && id !== ''){

      const deviceExist = await biometricModel.findOne({_id:id,isActive:true})

      if(!deviceExist){
        return res.status(200).json({success:false,error:"Unable to find the Device."})
      }
      await biometricModel.findOneAndUpdate({_id:id}, { deviceName, ipAddress, port, connectionType, status, isActive });
      return res.status(200).json({success:true,message:"Device Updated Successfully."})

    }else if(method === 'delete' && id !== ''){
      const deviceExist = await biometricModel.findOne({_id:id,isActive:true})

      if(!deviceExist){
        return res.status(200).json({success:false,error:"Unable to find the Device."})
      }

      await biometricModel.findOneAndUpdate({_id:id}, { isActive:false });
      return res.status(200).json({ success:true, message:"Device Deleted Successfully." })
    }
  } catch (error) {
    console.log("Error in addBiometricDevice controller :: ",error.message);
    res.status(400).json({success:false, error:"Internal server Error"})
  }
}


const getBiometricDevice = async (req,res) =>{ 
  try {

    // const adminId = {_id:"672b0a57de2599055050bbfd",type:"admin"};
    const adminId = {_id:"6729ff2f40e30ad8370fa0a6",type:"admin"};
    
    if(adminId.type !== 'admin'){
      return res.status(400).json({success:false,message:`Permission denied: You are not authorized to access biometric device details.`})
    }

    const biometricDeviceDetails = await biometricModel.find({ isActive:true, adminId:adminId._id });

    if(!biometricDeviceDetails.length){
      return res.status(400).json({success:false,message:`No Device Details Avaliable.`})
    }
    return res.status(200).json({ success: true, data: biometricDeviceDetails });

  } catch (error) {
    console.log(`Error in getBiometricDevice controller :: ${error.message}`);
    res.status(400).json({success:false, error: "Internal Server Error"})
  }
}


export { fetchAttendance, addBiometricDevice, getBiometricDevice }