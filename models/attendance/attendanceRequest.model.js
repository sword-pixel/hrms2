import mongoose  from 'mongoose'


const attendanceRequestSchema = new mongoose.Schema({

  attendanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendance', // Reference to the employee collection (if you have one)
    required: true
  },
  employeeId: {
    type: String,
    required:true
  },
  date: {
    type: Date,
    required: true,
    index: true // Index for faster querying
  },
  inTime: {
    type: String,
    required: false // Optional if you're tracking in-time
  },
  outTime: {
    type: String,
    required: false // Optional if you're tracking out-time
  },
  reason: {
    type : mongoose.Schema.Types.ObjectId,
    ref:'Reason',
    required : true
  },
  remarks: {
    type: String,
    required:false
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee_professional_detail', // Reference to the user who approves/rejects the request
    required: false, // Optional, only populated once it's approved/rejected,
    default:null
  },
  statusDate: {
    type: Date,
    index: true // Index for faster querying
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{timestamps:true})


const attendanceRequestModel = mongoose.model('AttendanceRequest',attendanceRequestSchema);

export default attendanceRequestModel;