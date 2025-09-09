import reasonModel from "../../models/configuration/reason.model.js";


const createReasons = async  (request,response)=>{
try{
  const {role:empRole} = request;
  const{name,department} = request.body;

  if(empRole.toLowerCase() !== 'admin')
    return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

  if(!name)
    return response.status(400).json({error:"Validation Failed Form Fields Missing",success: false});

  const saveRecord = await reasonModel.create({name});

  return response.status(201).json({message:"Record Created Successfully",success:true,data: saveRecord});

}catch(error){
  console.error(`Error Message : ${error.message}`);
  response.status(500).json({error:"Internal Server Error",success:false})
}
}

const updateReasons = async(request,response)=>{
  try{
    const {id} =request.params; 
    const {role:empRole} = request;
    const{name} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!name)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});
    
    const updateRecord = await reasonModel.findOneAndUpdate({_id:id},{name},{new:true});

    if(!updateRecord)
      return response.status(404).json({error:"Record not found",success:false});
   
    response.status(200).json({message:"Records Updated Successfully",success:true,data:updateRecord})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const deleteAndRestoreReasons = async(request,response)=>{
  try{
    const {id} =request.params; 
    const {role:empRole} = request;
    
    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!id)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const selectRecord = await reasonModel.findById(id);
    
    const updateRecord = await reasonModel.findOneAndUpdate({_id:id},{isActive : !selectRecord.isActive},{new: true});

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

const getAllReason = async (request,response)=>{
  try{
    // const {role:empRole} = request;  

    // if(empRole.toLowerCase() !== 'admin')
    //   return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});
    const allRecords = await reasonModel.find({isActive:true});
    response.status(200).json({data:allRecords,success:true})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

export {getAllReason,createReasons,updateReasons,deleteAndRestoreReasons}