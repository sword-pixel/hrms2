import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  
  holidayName: {
    type: String,
    required: true,
    trim: true
  },
  holidayDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  holidayType: {
    type: String,
    enum: ['Public', 'Company', 'Custom','Optional'],
    default: 'Public'
  },
  leavefor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false  // Set to true if the holiday repeats every year
  },
  isActive: {
    type: Boolean,
    default: true  // Logical deletion, set to false to deactivate
  }
},{timestamps:true});


export const holidayModel = mongoose.model('Holiday',holidaySchema);