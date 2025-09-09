import mongoose from "mongoose";

const employeeProfessionalSchema = new mongoose.Schema({
  empPersonalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee_personal_detail', // Reference to the Employee collection
    required: true
  },
// Biometric userID for integration 
employeeId: {
  type: String,
  required: true,
  unique: true // Unique Employee ID
},

organizationId: { 
  type:mongoose.Schema.Types.ObjectId,
  ref:'Organization',
  required : true
  },

department: { type: mongoose.Schema.Types.ObjectId,ref:'Department', required: true },
designation: { type: mongoose.Schema.Types.ObjectId,ref:'Designation',required: true },

// department: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'OrgUnit', // Reference to the Department (combined schema)
//   required: true // Dropdown selection for department
// },
// designation: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'OrgUnit', // Reference to the Designation (combined schema)
//   required: true // Dropdown selection for designation
// },
dateOfJoining: { type: Date, required: true },
employmentType: { type: String, enum: ['Permanent', 'Temporary', 'Trainee'], required: true },
salary: {
  basic: Number,
  hra: Number,
  allowances: Number,
  total: Number
},
workLocation: {
  office: String,
  city: String
},

managerId: { 
  type:mongoose.Schema.Types.ObjectId,
  ref:'Employee_personal_detail',
  required : true
  },

// experience: [
//   {
//     company: String,
//     position: String,
//     fromDate: Date,
//     toDate: Date
//   }
// ],
// skills: [String],
// status: { type: String, enum: ['Active', 'Inactive', 'Resigned'], default: 'Active' },

// User Authentication Details
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: [/.+\@.+\..+/, 'Please enter a valid email address']
},
password: { type: String, required: true, minlength: 6 },
role: { type:mongoose.Schema.Types.ObjectId,ref:'Role',required:true},
// role: { type:String,required:true},

 // Leave Balance Tracking
leaveBalances: {
  sickLeave: { type: Number, max:8, default: 0 }, // Default balance
  casualLeave: { type: Number, max:12, default: 0 },
  paidLeave: { type: Number,  max:2, default: 0 },
  unpaidLeave: { type: Number,  default: 0 }, // Unpaid leave doesn't affect balance
  compensatoryOff: { type: Number, default: 0 },
  others: { type: Number, default: 0 }
},
permissons:{type: Number,max:4,default:0},
shift: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Shift',  // Reference to the Shift collection
  required: true  // Each employee must have an assigned shift
},

conformation: {
  type: Boolean,
  default: false // Optional: set a default value for conformation
},

// Biometric userID for integration 
// userId: { type: String, unique: true },

isActive: { type: Boolean, default: true }, // Logical delete flag

}, { timestamps: true });


const employeeProfessionalModel = mongoose.model('Employee_professional_detail',employeeProfessionalSchema);

export default employeeProfessionalModel;