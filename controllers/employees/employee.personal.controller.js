import employeePersonalModel from "../../models/employee/employeePersonal.model.js";
import employeeProfessionalModel from "../../models/employee/employeeProfessional.model.js";

// Function To Create New Employee In The Db
const createPersonalDetail = async (request,response)=>{

    try{
      // return response.status(422).json(resquest.body);
      const formField = validateFormFields(request);
      console.log(formField);
      const {firstName,lastName} = formField;

      if(!formField.isValid)
        return response.status(422).json({error:"Validation failed Form Fields Missing",success:false});

      delete formField.isValid;

      formField.profilepic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

      // Creating the record in the db
      const createEmployee = new employeePersonalModel(formField);
      
      await createEmployee.save();

      response.status(201).json({message:"Record Created Successfully",success:true,data:createEmployee});

    }catch(error){
      console.log(error.message);
      response.status(500).json({error:"Internal Server Error",success:false});
    }

}

// Function To Update Employee Information

const updatePersonalDetail = async (request,response)=>{
  try{  
    const formField = validateFormFields(request);
    const {empID} = request.params;

    if(!formField.isValid)
      return response.status(422).json({error:"Validation failed Form Fields Missing",success:false});

    delete formField.isValid;

    // Updating the employee records in the Db
    
    const updatedRecord = await employeePersonalModel.findByIdAndUpdate(empID,formField,{new:true});
    
    if(!updatedRecord)
      return response.status(404).json({error:"User Not Found,updation Failed",success:false});

    response.status(200).json({message:"Record Updated Successfully",data:updatedRecord,success:true});

  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success:false});
  }
}

// Function To Delete an Record

const deletePersonalDetail = async(request,response)=>{
  try{

    const {empID} = request.params;
    if(!empID)
      return response.status(400).json({error:"Employee To Delete Need To Be Specified",success: false});

    // const empData = await  employeePersonalModel.findById(empID);
    // const empProfessionalData = await  employeeProfessionalModel.findById(empId);
    const [empData,empProfessionalData]=  await Promise.all([employeePersonalModel.findById(empID),employeeProfessionalModel.findOne({empPersonalId:empID})]);

    if(!empData || !empProfessionalData)
      return response.status(404).json({error:"User not found",success: false});

   const [deleted_data1,deleted_data2] =  await Promise.all([employeePersonalModel.findOneAndUpdate({_id:empID},{$set:{isActive:!empData.isActive}},{new:true}),employeeProfessionalModel.findOneAndUpdate({_id:empProfessionalData._id},{$set:{isActive:!empProfessionalData.isActive}},{new:true})]);
   
    return response.status(200).json({message:"Employee Deleted Successfully",data:deleted_data2,success: true});

  }catch(error){
    console.log(error.message);
    response.status(500).send({error:"Internal Server Error",success:false});
  }


}

// Function To Get All Employee Personal Details

const getAllPersonalDetail = async (request,response)=>{
  try{

    const getAllData = await  employeePersonalModel.find();

    if(!getAllData)
      return response.status(200).json({message:"No Employee Data Found",success: true});

    response.status(200).json({data:getAllData,"success": true});

  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success: false});
  }

}

const getIncompleteRecords = async (request,response)=>{
  try{
    
    const {role:empRole} = request;
    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false });

    const [getAllData,empProfessionalData] = await  Promise.all([employeePersonalModel.find(),employeeProfessionalModel.find()]);
    if(!getAllData || !empProfessionalData)
      return response.status(200).json({message:"No Employee Data Found",success: true});

    const empProfessionalIds = empProfessionalData.map((item) => item.empPersonalId.toString()); // Extract IDs as strings
    // console.log('ids====>',empProfessionalIds);
  //   getAllData.forEach((value, key) => {
  //     getAllData[key].empPersonalId = value._id; // Modify elements
  //  });

    const incompleteRecords = getAllData.filter((value,key)=>{
          return  !empProfessionalIds.includes(value._id.toString());
                // {{...value},{value.empPersonalId:value._id}}
      // return  !empProfessionalIds.includes(value._id.toString());
    });

    // console.log('recordsssss',incompleteRecords);

    response.status(200).json({data:incompleteRecords,message:'Records Fetched Successfully',success:true});
  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success: false});
  }
}



//  function to validate the form fields
const validateFormFields = (request)=>{

  let formField = {}; 
  // ,idProofs
  // console.log(request.body);
  const {firstName,lastName,dateOfBirth,gender,contactInfo,maritalStatus,emergencyContact,nationality,idProofs} = request.body;
  
  const {phone,email} = contactInfo;
  const {name,relationship,phone:emgphone} = emergencyContact;

  formField = {
    firstName,
    lastName,
    dateOfBirth : new Date(dateOfBirth),
    gender,
    contactInfo,
    maritalStatus,
    emergencyContact,
    nationality,
    idProofs
  }

  formField.isValid = true;

  if(!firstName || !lastName || !dateOfBirth || !gender   || !maritalStatus  || !nationality || !contactInfo.phone || !contactInfo.email || !name || !relationship || !emgphone)
    formField.isValid = false;

  return formField;

}
export {createPersonalDetail,updatePersonalDetail,deletePersonalDetail,getAllPersonalDetail,getIncompleteRecords}


