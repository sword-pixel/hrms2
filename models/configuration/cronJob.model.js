import mongoose from 'mongoose'

const cronSchema = new mongoose.Schema({
  cronType :{
    type:String,
    enum:['biometric'],
    required : true
  },
  deviceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'BiometricDevice',
    default:null
  },
  name: {
    type: String,
    required: true,
    unique: true,  // Ensures each job has a unique name
  },
  schedule: {
    type: String,
    required: true,  // Stores the cron expression (e.g., "0 0 * * *")
  },
  status: {
    type: String,
    enum: ["pending", "running", "completed", "failed"], // Track job status
    default: "pending",
  },
  lastRunAt: {
    type: Date ,// Stores the last execution time
    default: null
  },
  isActive : {
    type:Boolean,
    default:true
  }
},{timestamps:true});


const cronModel = mongoose.model('CronJob',cronSchema);

export default cronModel;