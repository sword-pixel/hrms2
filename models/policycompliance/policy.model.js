import mongoose from "mongoose";


const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true // Policy is active by default
  },
  complianceType: {
    type: String,
    enum: ['HR', 'Safety', 'Finance', 'Other'], // Categories for compliance
    required: true
  },
  attachments: [{
    type: String // Can store URLs or paths to attached documents
  }]
},{timestamps:true});

const policyModel = mongoose.model('Policy',policySchema);

export default policyModel;