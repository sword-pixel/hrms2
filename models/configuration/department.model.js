import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true } // Logical delete flag
},{timestamps:true});

 const departmentModel = mongoose.model('Department',departmentSchema);

 export default departmentModel;