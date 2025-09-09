import ZKLib  from 'node-zklib';
import biometricModel from '../../models/biometric/biometric.model.js';
import attendanceModel from '../../models/attendance/attendance.model.js';
import employeeProfessionalModel from '../../models/employee/employeeProfessional.model.js';
import {parse,isWithinInterval,parseISO,subDays  } from 'date-fns';
import  moment from 'moment-timezone';
import leaveModel from '../../models/attendance/leave.model.js';
import holidayModel from '../../models/attendance/holiday.model.js';


const fetchAttendance = async (request,response)=>{
  try{
      const {role} = request;
      const {ip,port} = request.body;

      if(role.toLowerCase() !=='admin')
        return response.status(403).json({ "error": "Access denied. You do not have permission to perform this action.","status":false });

      if(!ip || !port)
        return response.status(400).json({"error":"Bad Request Try Again!",success: false});
      const documentPresent = await getAttendanceFromDevice(ip,port);
      response.status(200).json({"message":documentPresent,success: true});

  }catch(error){
      console.log(error.message);
      response.status(500).json({"error":"Internal Server Error",success: false});
  }
}

const getAttendanceFromDevice= async (ip,port)=>{

  // const attendanceData = await  attendanceModel.find();
  const attendanceData = await  attendanceModel.findOne().sort({ trackingTime: -1 });

  // const employeeRecords = await employeeProfessionalModel.find().populate('shift','cumulativeStartTime startTime').select('employeeId shift');
  const userId = [{employeeId : '208',shift:'nightk'}];
  // const userId = employeeRecords;
  let zkInstance = new ZKLib(ip, port, 5200, 5000);
  await zkInstance.createSocket();
  // const attendanceLog = await zkInstance.getUsers();
  const attendanceLog =  await zkInstance.getAttendances();
  
  for(const userids of userId) {
    const attendanceList = attendanceLog.data.filter((value)=>{
      const recordTime = attendanceData.trackingTime ? moment.utc(attendanceData.trackingTime).tz('Asia/Kolkata').toDate() : new Date("2025-01-01");
      return (
        userids.employeeId === value.deviceUserId
         &&
        value.recordTime > recordTime
      );
  });
    
    const attendanceRecords = await groupAttendance(attendanceList, userids );
    return attendanceRecords;
    
  }        
  await zkInstance.disconnect();
  const documentPresent = await attendanceModel.countDocuments();
  return documentPresent;
}

const groupAttendance = async (attendanceList,empid)=>{
  const employeeRecords = await employeeProfessionalModel.findOne({employeeId:empid.employeeId}).populate('shift','cumulativeStartTime startTime days').select('employeeId shift');
  const leaveRecords = await leaveModel.findOne({employeeId:empid._id}).populate('leaveTypeId','leaveType');
      const today = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
      const attendanceListObj = {}; // formted attendance Object List

      attendanceList.forEach((object)=>{
        // console.log(object.recordTime);
        const dateString = object.recordTime.toISOString();
        const newDate = moment.utc(dateString).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A');
        let date= newDate.split(/[ ]/)[0];
        // const newDate=  date.split('T')[0];
        if(!attendanceListObj[date] || attendanceListObj[date]===undefined)
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
      let status;
      let InTime;
      let OutTime;
      let totalHours;
      let datenow = new Date("2025-01-02");
    if(date===datenow.toISOString()){
     
        let  checkInTime  = punch[0];
        let  checkOutTime = punch[punch.length-1];
        // Converting to local time in ISO format
         InTime = new Date(checkInTime).toLocaleTimeString('en-US', { hour12: true });
         OutTime = new Date(checkOutTime).toLocaleTimeString('en-US', { hour12: true });

        const differenceInMilliseconds = new Date(checkOutTime) - new Date(checkInTime);
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const hours = Math.floor(differenceInSeconds / 3600);
        
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        totalHours = `${hours}:${minutes}`;
        const punchInTime = moment(InTime, 'hh:mm:ss A'); 
        const shiftTime =moment(employeeRecords['shift'].cumulativeStartTime, 'hh:mm:ss A');
        //  console.log('cumulative timeeeeeeff',employeeRecords['shift'].cumulativeStartTime);
        status = hours < 9 ? 'Early Left' : 'Present';
        if(punchInTime.isAfter(shiftTime)) 
          status = 'Late-In';
    
    }else{
     
      status = 'Absent';
      const todayDay = new Date().toLocaleDateString("en-US",{weekday:"long"}).toLowerCase(); 
      const workingDays= employeeRecords['shift'].days;
      const checkStartDate = leaveRecords?.startDate || '1970-01-01T00:00:00.000+00:00';
      const checkEndDate = leaveRecords?.endDate || '1970-01-01T00:00:00.000+00:00';
      const holidayDate = holidayModel?.holidayDate || '1970-01-01T00:00:00.000+00:00';
      console.log(!workingDays.includes(todayDay),todayDay);
      if(!workingDays.includes(todayDay))
        status = "Week Off";

     const leaveStartDate =  moment.utc(checkStartDate).tz('Asia/Kolkata').format('YYYY-MM-DD');
     const leaveEndDate =  moment.utc(checkEndDate).tz('Asia/Kolkata').format('YYYY-MM-DD');
     const holiday = moment.utc(holidayDate).tz('Asia/Kolkata').format('YYYY-MM-DD');
      
      if(leaveStartDate <= today && today <= leaveEndDate){
        status=leaveRecords.startDatetype==='Full Day'?'Leave':'Half-Day';
        if(today===leaveEndDate)
          status=leaveRecords.endDatetype==='Full Day'?'Leave':'Half-Day';
      }

      if(holiday===today){
        status = 'Holiday';
      }
    }
    // const sortedPunch =  punch.sort((a,b)=>{ return (new Date(a.recordTime)-new Date(b.recordTime))});
    
    dataaa.push({
      employeeId : empid.employeeId,
      date,
      checkInTime : InTime,
      checkOutTime : OutTime,
      totalHours,
      status,
      trackingTime: new Date()
    });

  })
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