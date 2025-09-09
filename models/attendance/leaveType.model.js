import mongoose, { mongo } from 'mongoose'


const leaveTypeSchema = new mongoose.Schema({
  leaveType:{
    type:String,
    required:true
  },
  isActive: { type: Boolean, default: true } // Logical delete flag
},{timestamps:true})


const leaveTypeModel = mongoose.model('LeaveType',leaveTypeSchema);

export default leaveTypeModel