import mongoose from 'mongoose'
import cronModel from '../models/configuration/cronJob.model.js';
import { getAttendanceFromDevice } from '../controllers/biometricattendance/biometric.attendance.controller.js';

const cronJobSchedule = async ()=>{

  try{

    const getAllCron = await cronModel.find();
    const currentDateTime = new Date();
      const cronJobUpdate = getAllCron.map((value)=>{
              const cronTime = new Date(value.lastRunAt || "2025-08-20T15:18:50.260+00:00");
              const  cronDuration =  +value.schedule * 60;
              const timeDifferenceMs = currentDateTime - cronTime;
              const timeDifferenceSeconds = timeDifferenceMs / 1000;         
              return (value.isActive && ( timeDifferenceSeconds >= cronDuration || value.lastRunAt === null)) ? value._id :null;
      }).filter(Boolean);

      if(cronJobUpdate.length > 0){

        // Run The corresponding functionality of the Cron
        const activeCron = await cronModel.find({_id:{$in:cronJobUpdate}}).populate([{path:'deviceId'}]).lean(true);    


        const attendancePromises = activeCron.map(async (value) => {
            console.log('Cron triggered');

            if (value.cronType === 'biometric' && value.deviceId) {
              console.log('Cron initiating function ');
                const { ipAddress, port } = value.deviceId;
                return getAttendanceFromDevice({ ip: ipAddress, port });
            }
        });

        // Wait for all attendance fetches to complete
            await Promise.all(attendancePromises);

            await cronModel.updateMany(
                { _id: { $in: cronJobUpdate } },
                { $set: { lastRunAt: new Date() } }
            );
        }
  }catch(error){
    console.error('Error in cron job:', error);
  }finally{

  }

}

export {cronJobSchedule}