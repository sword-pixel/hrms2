import mongoose from "mongoose";

// connection function to establish database connectivity
async function  dbConnection(){
  try{
    const connectionResult = await mongoose.connect(process.env.DB_CONNECTION);
      if(connectionResult){
        console.log(`Database Connection Established....`);
      }
  }catch(error){
    console.log("Error : ",error.message);
  }
}

export default dbConnection;