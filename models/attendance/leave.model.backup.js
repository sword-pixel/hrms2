import mongoose from "mongoose";


const leaveSchema = new mongoose.Schema({

  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee_professional_detail', // Refers to the employee professional details
    required: true
  },
  leaveType: {
    type: mongoose.Schema.Types.ObjectId,
    enum: 'LeaveType',  // Refers to the Leave Type Model details
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  daysCount: {
    type: Number, // Automatically calculated based on startDate and endDate
    required: true
  },
  reason: {
    type: String,
    trim: true,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  appliedOn: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Employee_professional_detail', // Refers to the approver (e.g., manager)
    required: false
  },
  approvedOn: {
    type: Date,
    required: false,
    default: null
  },
  isActive: { type: Boolean, default: true } // Logical delete flag
},{timestamps:true});


const leaveModel = mongoose.model('Leave',leaveSchema);

export default leaveModel;











