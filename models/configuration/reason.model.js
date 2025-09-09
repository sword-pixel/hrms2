import mongoose from 'mongoose'


const reasonSchema = new mongoose.Schema({
  name : {type:String,required:true},
  isActive:{type:Boolean,default:true}
},{timestamps:true});


const reasonModel = mongoose.model('Reason',reasonSchema);

export default reasonModel;