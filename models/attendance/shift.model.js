import mongoose from "mongoose";


const ShiftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: String,
    required: true // Store time as string (e.g., '09:00 AM')
  },
  endTime: {
    type: String,
    required: true // Store time as string (e.g., '05:00 PM')
  },
  graceTime :{
    type: String,
    default:null // Store time as string (e.g., '05:00 PM') 
  },
  cumulativeStartTime :{
    type:'String',
    default: null // Initially set as null, will be set via setter
  },
  days: {
    type: [String],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true,  // Array of days the shift applies to,
    set:(values)=>(values.map(value=>value.toLowerCase()))
  },
  isActive: {
    type: Boolean,
    default: true  // Logical deletion, set to false to deactivate
  }
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt`

const shiftModel =  mongoose.model('Shift', ShiftSchema);

export default shiftModel;