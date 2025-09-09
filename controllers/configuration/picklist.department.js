import departmentModel from "../../models/configuration/department.model.js";

const getAllDept = async (request,response)=>{
  try{
    const {role:empRole} = request;  

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    const allRecords = await departmentModel.find({isActive:true});
    response.status(200).json({data:allRecords,success:true})

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}


const createDept = async (request,response)=>{
  try{
    const {role:empRole} = request;
    // console.log(request);

    // console.log(role,empRole);
    const{name,description} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!name)
      return response.status(400).json({error:"Validation Failed Form Fields Missing",success: false});

    const saveRecord = await departmentModel.create({name,description});

    return response.status(201).json({message:"Record Created Successfully",success:true,data: saveRecord});

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}


const updateDept = async (request,response)=>{
  try{
    const {id : roleId} =request.params; 
    const {role:empRole} = request;
    const{name,description} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!roleId || (!name && !description))
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const updateData = {name,description};

    const updateRecord = await departmentModel.findOneAndUpdate({_id:roleId},updateData,{new:true});

    if(!updateRecord)
      return response.status(404).json({error:"Record not found",success:false});
   
    response.status(200).json({message:"Records Updated Successfully",success:true,data:updateRecord})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}


const deleteAndRestoreDept = async (request,response)=>{
  try{
    const {id : roleId} =request.params; 
    const {role:empRole} = request;
    
    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!roleId)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const selectRecord = await departmentModel.findById(roleId);
    
    const updateRecord = await departmentModel.findOneAndUpdate({_id:roleId},{isActive : !selectRecord.isActive},{new: true});

    if(!updateRecord)
      return response.status(404).json({error:"Record not found",success:false});

    const {isActive} = updateRecord;

    if(isActive)
      return response.status(200).json({message:"Records Restored Successfully",success:true})
    
    response.status(200).json({message:"Records Deleted Successfully",data:updateRecord,success:true})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}




export {getAllDept,createDept,updateDept,deleteAndRestoreDept};