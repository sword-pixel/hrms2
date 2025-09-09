import designationModel from "../../models/configuration/designation.model.js";


const getAllDesig = async(request,response)=>{
  try{
    const {role:empRole} = request;  

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    const allRecords = await designationModel.find({isActive:true});
    response.status(200).json({data:allRecords,success:true})

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const getRevelentDesig = async(request,response)=>{
  try{
    const {role:empRole} = request;  
    const {department} = request.params;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    const allRecords = await designationModel.find({department});
    response.status(200).json({data:allRecords,success:true})

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const createDesig = async(request,response)=>{
  try{
    const {role:empRole} = request;
    // console.log(request);

    // console.log(role,empRole);
    const{name,department} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!name || !department)
      return response.status(400).json({error:"Validation Failed Form Fields Missing",success: false});

    const saveRecord = await designationModel.create({name,department});
 
    return response.status(201).json({message:"Record Created Successfully",success:true,data: saveRecord});

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const updateDesig = async(request,response)=>{
  try{
    const {id : roleId} =request.params; 
    const {role:empRole} = request;
    const{name,department} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!roleId || !name || !department)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const updateData = {name,department};
    
    const updateRecord = await designationModel.findOneAndUpdate({_id:roleId},updateData,{new:true});

    if(!updateRecord)
      return response.status(404).json({error:"Record not found",success:false});
   
    response.status(200).json({message:"Records Updated Successfully",success:true,data:updateRecord})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const deleteAndRestoreDesig = async(request,response)=>{
  try{
    const {id : roleId} =request.params; 
    const {role:empRole} = request;
    
    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!roleId)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const selectRecord = await designationModel.findById(roleId);
    
    const updateRecord = await designationModel.findOneAndUpdate({_id:roleId},{isActive : !selectRecord.isActive},{new: true});

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

export {getAllDesig,getRevelentDesig,createDesig,updateDesig,deleteAndRestoreDesig}