import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true,
    unique:true
  },
  category : [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category',
      required:true
    },
  ],
  isActive:{type:Boolean,default:true}
  
},{timestamps:true});

const moduleModel = mongoose.model('Module',moduleSchema);

export default moduleModel;
