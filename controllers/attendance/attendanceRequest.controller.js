import {format,parse} from 'date-fns';
import attendanceRequestModel from "../../models/attendance/attendanceRequest.model.js";
import employeeProfessionalModel from "../../models/employee/employeeProfessional.model.js";


const createAttendanceRequest = async (request,response)=>{
  try{
    let {attendanceId,employeeId,date,inTime,outTime,reason,remarks} = request.body;

    if(!attendanceId || !employeeId || !date || !inTime || !outTime || !reason)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const checkRequest = await attendanceRequestModel.findOne({attendanceId});

    if(checkRequest)
      return response.status(409).json({error:"The request data already exists in the database.",data:checkRequest,success: false});

    if(!inTime.includes('AM') &&  !inTime.includes('PM')){
      const parsedDate = parse(inTime,'HH:mm', new Date());
      inTime = format(parsedDate,'hh:mm:ss a');
    }
    if(!outTime.includes('AM') &&  !outTime.includes('PM')){
      const parsedDate = parse(outTime,'HH:mm', new Date());
      outTime = format(parsedDate,'hh:mm:ss a');
    }
    const requestData = {attendanceId,employeeId,date,inTime,outTime,reason,remarks,statusDate:new Date()};
    const result = await attendanceRequestModel.create(requestData);
    response.status(201).json({message:"Record Inserted Successfully",data:result,success:true});
  }catch(error){
    response.status(500).json({error:error.message,data:{},success:false});
  }

}

const approveRequest =  async (request,response)=>{
  try{
    const {id} = request.params;
    const {approvedBy,status} = request.body;
    const {role:empRole} = request;
    const roles = new Set(['manager','admin','hr','tl']);

    if(!roles.has(empRole.toLowerCase()))
      return response.status(401).json({error:"You Are Not Authorized To Perform This Action",success: false});
    if(!approvedBy || !status || !id)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const attendanceRecord = await attendanceRequestModel.findOne({_id:id,isActive:true});
    if(!attendanceRecord)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const updatedRecord = await attendanceRequestModel.findOneAndUpdate({_id:id,isActive:true},{$set:{approvedBy,status,statusDate:new Date()}},{new:true})

    response.status(200).json({message:'Record Updated Successfully',data:updatedRecord,success:true});

  }catch(error){
    response.status(500).json({error:error.message,data:{},success:false});
  }
}

const getAttendanceRequest = async (request,response)=>{
  try{  
    const {role:empRole} = request;
    const {startDate,endDate,status,requestType,empid,id,page,limit} = request.query;
    const skipCount = (Number(page) - 1)*Number(limit);
    const employeeIds = [];
    const roles = new Set(['manager','admin','hr']);
    if(!empid || !id || !startDate || !endDate ||  !status || !requestType)
      return response.status(400).json({error:"Validation Failed,requested Fields Missing",success: false});

    if(new Date(startDate) > new Date(endDate))
      return response.status(400).json({error:"To Date cannot be less than From Date",success: false});

    let filter = {isActive:true,createdAt: {$gte: new Date(startDate),$lte: new Date(endDate)},status};
    if(status==='All')
      delete filter.status;
   
    if(empRole.toLowerCase()==='tl' && requestType==='2'){
      const getEmployees = await employeeProfessionalModel.find({managerId:empid,isActive:true}).select('employeeId');
      getEmployees.forEach((value)=>{employeeIds.push(value.employeeId)});
      filter.employeeId = {$in:employeeIds};
    }else if(roles.has(empRole.toLowerCase())  && requestType==='2'){
        // delete filter.employeeId;
        filter.employeeId = {$ne : id}
    }else{
        filter.employeeId = {$eq : id};
    }
    const selectedRecords = await attendanceRequestModel.find(filter).populate('attendanceId','checkInTime checkOutTime').populate('reason','name').skip(skipCount).limit(+limit).lean(true);  // to fetch all attendance

    const getRecordsDetails = await employeeProfessionalModel.find({employeeId:{$in:selectedRecords.map((value)=>value.employeeId)}}).populate('employeeId').populate('department','name').populate('designation','name').populate('empPersonalId','firstName lastName designation department').select('firstName lastName designation department employeeId').lean(true);

    const lookUpdata = new Map(getRecordsDetails.map((value)=>[value.employeeId,value]));
    const finalData = selectedRecords.map((value)=>{
      return ({...value,...lookUpdata.get(value.employeeId) || null,_id:value._id})
    });
    const totalRecords = await attendanceRequestModel.countDocuments(filter);    
    response.status(200).json({message:'Record fetched Successfully',data:finalData,count:totalRecords,success:true});
  }catch(error){
    response.status(500).json({error:error.message,data:{},success:false});
  }
}

const getAttendanceRequestbackup2 = async (request,response)=>{
  try{  
    const {role:empRole} = request;
    const {startDate,endDate,status,requestType,empid,id,page,limit} = request.query;
    const skipCount = (Number(page) - 1)*Number(limit);
    const employeeIds = [];
    const roles = new Set(['manager','admin','hr']);
    if(!empid || !id || !startDate || !endDate ||  !status || !requestType)
      return response.status(400).json({error:"Validation Failed,requested Fields Missing",success: false});

    if(new Date(startDate) > new Date(endDate))
      return response.status(400).json({error:"To Date cannot be less than From Date",success: false});

    let filter = {isActive:true,createdAt: {$gte: new Date(startDate),$lte: new Date(endDate)},status};
    if(status==='All')
      delete filter.status;
   
    if(empRole.toLowerCase()==='tl' && requestType==='2'){
      const getEmployees = await employeeProfessionalModel.find({managerId:empid,isActive:true}).select('employeeId');
      getEmployees.forEach((value)=>{employeeIds.push(value.employeeId)});
      filter.employeeId = {$in:employeeIds};
    }else if(roles.has(empRole.toLowerCase())  && requestType==='2'){
        // delete filter.employeeId;
        filter.employeeId = {$ne : id}
    }else{
        filter.employeeId = {$eq : id};
    }
    const selectedRecords = await attendanceRequestModel.find(filter).skip(skipCount).limit(+limit);  // to fetch all attendance
    const totalRecords = await attendanceRequestModel.countDocuments(filter);
    console.log('this is the levevev',filter,skipCount,limit,startDate,endDate,empRole,totalRecords);
    response.status(200).json({message:'Record fetched Successfully',data:selectedRecords,count:totalRecords,success:true});
  }catch(error){
    response.status(500).json({error:error.message,data:{},success:false});
  }
}

export {createAttendanceRequest,approveRequest,getAttendanceRequest}