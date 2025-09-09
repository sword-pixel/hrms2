import mongoose from 'mongoose'

const designationSchema = new mongoose.Schema({
  name : {type:String,required : true},
  department : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Department',
    required:true
  },
  isActive : {type:Boolean,default:true}
},{timestamps:true});

const designationModel = mongoose.model('Designation',designationSchema);

export default designationModel;