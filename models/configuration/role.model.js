import mongoose from 'mongoose'

const roleSchame = new mongoose.Schema({
  name : {type:String,required:true},
  description: { type: String },
  isActive:{type:Boolean,default:true}
},{timestamps:true});


const roleModel = mongoose.model('Role',roleSchame);

export default roleModel;