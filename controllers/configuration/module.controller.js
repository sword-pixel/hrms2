import mongoose from 'mongoose'
import categoryModel from "../../models/configuration/category.model.js";
import moduleModel from "../../models/configuration/module.model.js";
import cronModel from "../../models/configuration/cronJob.model.js";
import { cronJobSchedule } from '../../scripts/cronSchedule.js';
import { getAttendanceFromDevice } from '../biometricattendance/biometric.attendance.controller.js'; 
import {CronJob} from 'cron';
import fs from 'fs';
import path from 'path';

const createModule = async (request,response)=>{
try{
  const {role:empRole} = request;
  const {module,categoryList} = request.body;
  const category = [];
  let catageryData;

  if(empRole.toLowerCase() !=='admin')
     return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

  if(!module || !categoryList || Object.entries(categoryList).length <= 0)
    return response.status(422).json({error:"Validation failed Form Fields Missing",success:false});
   
  for(let i=0;i<Object.entries(categoryList).length;i++){
      catageryData = await categoryModel.create({name:categoryList[`category${i}`]});
      category.push({_id:catageryData._id});
  }

  if(Object.entries(category).length <=0)
    throw new Error('No Category Added');

    const moduleData =  await moduleModel.create({name:module,category});
    // if(!moduleData)
    //   return response.status(422).json({error:"Validation failed Form Fields Missing",success:false});

    response.status(200).json({data:moduleData,message:"Module Created Successfully",success:true});
}catch(error){
  console.log(error.message);
  response.status(500).json({error:"Internal Server Error",success:false});
}
}

const getAllModules = async (request,response)=>{
  try{

    const modules = await moduleModel.find().populate('category','name');

    response.status(200).json({data:modules,message:"Module fetched Successfully",success:true});

  }catch(error){
    console.log(error.message);
    response.status(500).json({error:"Internal Server Error",success:false});
  }
}


const createUpdateCron = async (request,response)=>{
  try{
    // return response.status(200).json({ msg: "Access denied."});
    let {name,schedule,cronType,deviceId,isActive} = request.body;

    
    let {role:empRole}= request;
    const {id} = request.params;
    
    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});


    if(!name || !schedule || isActive===undefined || !cronType)
      return response.status(422).json({error:"Validation failed Form Fields Missing",success:false});
   
  if(mongoose.Types.ObjectId.isValid(id)){

      const updateResult = await cronModel.findOneAndUpdate({_id:id},{name,schedule,cronType,deviceId,isActive},{new:true,upsert:true});
      console.log('this is the ',updateResult);
      await cronStart({schedule,isActive});
      return response.status(201).json({message:"Cron Updated Successfully",success:true});
  }else{
      const createRecord = await  cronModel.create({name,schedule,cronType,deviceId,isActive});
      // await cronStart({schedule,isActive});
      response.status(201).json({message:"New Record inserted",success:true});
    }
  }catch(error){
    console.log(error);
    response.status(500).json({error:"Internal Server Error",success:false});
  }
}



const cronTrigger = ()=>{






}


// const cronStart  = async({schedule,isActive})=>{
  
//   // const id = data._id;
//   const min = +schedule;
//   const time = `0 */${min} * * * *`;
//   const cron = new CronJob(time,async ()=>{
//     console.log("Cron job started...");
//     try{
//       console.log(`the cron shedule time is ${time}`);
//       // to trigger the fetch attendace
//       await getAttendanceFromDevice({"port":4370,"ip":"10.101.0.7"});
//       console.log("Cron job running...");
//       // await cronModel.findOneAndUpdate({_id:id},{status:"running"});
//     }catch(error){
//       console.log('cron job failed',error);
//       // await cronModel.findOneAndUpdate({_id:id},{status:"failed"});
//     }
//   }, null, false, 'Asia/Kolkata');

//   // cron.start();

//   if(isActive){
//     console.log('cron started to run')
//     cron.start();

//   }else{
//    console.log('cron stopped')
//    cron.stop();
//   }
  
// }
let activeCronJob = null;
const cronStart = async ({ schedule, isActive }) => {
  // Cleanup previous cron job
  if (activeCronJob) {
    activeCronJob.stop();
    activeCronJob = null;
  }

  if (!isActive) {
    console.log('Cron stopped');
    return;
  }
  const checkHoursORMin = Math.floor(+schedule/60);
  console.log(checkHoursORMin);
  let cronTime = '';
  if(checkHoursORMin===0)
    cronTime = `0 */1 * * * *`;
  else
    cronTime = `0 0 */1 * * *`;

    console.log(cronTime);
  // const duration = );
  // const min = +schedule;
  

  // Create new cron job
  activeCronJob = new CronJob(
    cronTime,
    async () => {
      console.log("Executing cron job...");
      try {
        cronJobSchedule();
        // await getAttendanceFromDevice({ port: 4370, ip: "10.101.0.7" });
      } catch (error) {
        console.error('Cron job failed:', error);
      }
    },
    null, // onComplete
    false, // don't start immediately
    'Asia/Kolkata'
  );

  // Start the new instance
  activeCronJob.start();
  console.log(`Cron started with schedule: ${cronTime}`);
};

const fetchAllCron = async(request,response)=>{
  try{
    const {role:empRole} = request;
    if(empRole.toLowerCase() !=='admin')
      return response.status(403).json({ error: "Access denied. You do not have permission to perform this action.",success:false});

    const getAllCron = await cronModel.find();

    response.status(200).json({message:'cron fetched Successfully',data:getAllCron,success:true});
  }catch(error){
    response.status(500).json({error:error.message,success:false});
  }
}

export {createModule,getAllModules,createUpdateCron,fetchAllCron}