import mongoose from "mongoose";


const leaveSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee_professional_detail', // Refers to the employee professional details
    required: true
  },
  leaveTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveType',  // Refers to the Leave Type Model details
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  startDatetype:{
    type: String,
    enum: ['First Half','Second Half','Full Day'],
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  endDatetype:{
    type: String,
    enum: ['First Half','Second Half','Full Day'],
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
    enum: ['Pending', 'Approved', 'Rejected','Cancelled'],
    default: 'Pending'
  },
  appliedOn: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee_professional_detail', // Refers to the approver (e.g., manager)
    required: false
  },
  approvedOn: {
    type: Date,
    required: false
  },
  isActive: { type: Boolean, default: true } // Logical delete flag
},{timestamps:true});


const leaveModel = mongoose.model('Leave',leaveSchema);

export default leaveModel;
