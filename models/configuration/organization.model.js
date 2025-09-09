import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true,
    trim : true
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{timestamps:true})


const organizationModel = mongoose.model('Organization',organizationSchema);

export default organizationModel;
