import shiftModel from "../../models/attendance/shift.model.js";

// Functionality To Create A New Shift
const createShift = async (request,response)=>{
  try{  

    const {role:empRole} = request;
    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false });

    const isValid = validateFormFields(request);

    if(!isValid)
      return response.status(422).json({error:"Validation failed Form Fields Missing",success: false});

    const {name,startTime,endTime,graceTime,days} = request.body;
    const cumulativeStartTime= calculateStartTime(startTime,graceTime);
    console.log('cumulativeStartTime',cumulativeStartTime);
    const newShift=  new shiftModel({name,startTime,endTime,graceTime,cumulativeStartTime,days});
    await newShift.save();

     response.status(200).json({message:"Record Created Successfully",data:newShift,"success": true});

  }catch(error){
    console.log('shift error====',error.message);
    response.status(500).json({error:"Internal Server Error",success: false});
  }

}

// 

const calculateStartTime = (time1,time2)=>{
  const [hours,minutes,seconds,amorpm] = time1.split(/[: ]/);
  const [hours2,minutes2] = time2.split(':').map(Number);

  let inhours = parseInt(hours,10);
  let inMinutes = parseInt(minutes,10);

  if(inhours !==12 && amorpm=='PM') inhours += 12;
  if(inhours==12 && amorpm==='AM')inhours =0;

  const date1 = new Date();

    date1.setHours(inhours,inMinutes,parseInt(seconds,10));


  date1.setHours(date1.getHours() + hours2);
  date1.setMinutes(date1.getMinutes() +minutes2);

  return date1.toLocaleTimeString("en-US");
}

//  Functionality To Update a  Shift
const updateShift = async (request,response)=>{
  try{
    const isValid = validateFormFields(request);
    const {role:empRole} = request;

    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false });

    if(!isValid)
      return response.status(422).json({error:"Validation failed Form Fields Missing",success: false});

    const {shiftId} = request.params;
    const {name,startTime,endTime,days,graceTime} = request.body;

    const editShift = await shiftModel.findOneAndUpdate({_id:shiftId},{name,startTime,endTime,days,graceTime},{
      new:true
    });

    if(!editShift || !shiftId)
      return response.status(404).json({error:"Updation Failed.!Shift Not Updated",success: false});


    response.status(200).json({message:"Shift Updated Successfully",data:editShift,success: true});

  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success: false});
  }
}

//  Functionality To Delete a  Shift
const deleteShift = async (request,response)=>{
    try{

      const {shiftId}  = request.params;
      const {role:empRole} = request;

      if(empRole.toLowerCase() !=='admin')
        return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false });

      if(!shiftId)
        return response.status(400).json({error:"Shift To Delete Need To Be Specified",success:false});

        const data = await shiftModel.findOneAndUpdate({_id:shiftId},{isActive:false},{
          new:true
        });


        return response.status(200).json({message:"Shift Deleted Successfully",data,success:true});

    }catch(error){
      console.log(error.message);
      response.status(500).json({error:"Internal Server Error","success":false});
    }
}

// function to Get All Shifts 

const getAllShifts = async (request,response)=>{

  try{
    // validate The User
    const allShifts = await shiftModel.find({isActive:true});
    const {role:empRole} = request;

    // console.log(request);

    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false });

      if(!allShifts)
        return response.status(400).json({error:"no Shifts Found",success:false});

    
    response.status(200).json({message:"fetched all records",data:allShifts,success:true});

  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success:false});
  } 

}

// Function To Validate Form Fields
const validateFormFields= (request)=>{
  const {name,startTime,endTime,days} =  request.body;

  if(!name || !startTime || !endTime || !days)
    return false;

  return true;

}


export {createShift,updateShift,deleteShift,getAllShifts}