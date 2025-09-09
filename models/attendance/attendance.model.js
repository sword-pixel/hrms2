import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true
    },
    organizationId : {
      type : String,
      required : true
    },
    date: {
      type: Date,
      required: true,
      index: true // Index for faster querying
    },
    checkInTime: {
      type: String,
      // required: true
    },
    checkOutTime: {
      type: String,
      // required: true
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Leave','Half-Day','Late-In','Holiday','Week Off','Early Left'], // Attendance status
    },
    totalHours: {
      type: String, // Total hours worked
      default: '0:0'
    },
    Late :{
      type:String,
      
    },
    remarks: {
      type: String, // Optional field for any remarks (e.g., reason for absence)
      trim: true
    },
   
    isActive: { type: Boolean, default: true }, // Logical delete flag
    trackingTime: {
      type: Date,
      default:null
    },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now
    // }
  }, { timestamps: true }
);

const attendanceModel = mongoose.model('Attendance',attendanceSchema);

export default attendanceModel;