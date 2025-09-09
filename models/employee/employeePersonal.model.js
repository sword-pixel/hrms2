import mongoose from "mongoose";

const employeePersonalSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true }
  },
  nationality: { type: String, required: true },
  idProofs: {
    aadharCard: { type: String, unique: true },
    passportNumber: { type: String, unique: true },
    panCard: { type: String, unique: true }
  },
  profilepic :{
    type:String,
    required:true
  },
  isActive: { type: Boolean, default: true } // Logical delete flag
}, { timestamps: true });


const employeePersonalModel = mongoose.model('Employee_personal_detail',employeePersonalSchema);

export default employeePersonalModel;