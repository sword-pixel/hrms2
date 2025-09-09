import organizationModel from "../../models/configuration/organization.model.js";



const createOrganization = async (request,response)=>{
  try{
    const {role:empRole} = request;
    
    const{name,description} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!name)
      return response.status(400).json({error:"Validation Failed Form Fields Missing",success: false});

    const saveRecord = await organizationModel.create({name});

    return response.status(201).json({message:"Record Created Successfully",success:true,data: saveRecord});

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }

}

const selectOrganization = async (request,response)=>{
try{
   //  const {role:empRole} = request;  

    // if(empRole.toLowerCase() !== 'admin')
    //   return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    const allRecords = await organizationModel.find({isActive:true});
    response.status(200).json({data:allRecords,success:true})

  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const updateOrganization = async (request,response)=>{
  try{
    const {id : roleId} =request.params; 
    const {role:empRole} = request;
    const{name} = request.body;

    if(empRole.toLowerCase() !== 'admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    if(!roleId || !name)
      return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});

    const updateRecord = await organizationModel.findOneAndUpdate({_id:roleId},{name},{new:true});

    if(!updateRecord)
      return response.status(404).json({error:"Record not found",success:false});
   
    response.status(200).json({message:"Records Updated Successfully",success:true,data:updateRecord})
  }catch(error){
    console.error(`Error Message : ${error.message}`);
    response.status(500).json({error:"Internal Server Error",success:false})
  }
}

const deleteOrganization = async(request,response)=>{
    try{
      const {id} =request.params; 
      const {role:empRole} = request;
      
      if(empRole.toLowerCase() !== 'admin')
        return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});
  
      if(!id)
        return response.status(400).json({error:"Validation Failed Record to Update Or Form Fields Missing",success: false});
  
      const selectRecord = await organizationModel.findById(id);
      
      const updateRecord = await organizationModel.findOneAndUpdate({_id:id},{isActive : !selectRecord.isActive},{new: true});
  
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



export {createOrganization,selectOrganization,updateOrganization,deleteOrganization}