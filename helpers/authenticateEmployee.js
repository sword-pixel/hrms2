import jwt from 'jsonwebtoken'
import employeeProfessionalModel from '../models/employee/employeeProfessional.model.js';
const authenticate = async (request,response,next)=>{
    try{
      const {webtoken} = request.cookies;
     
        if(!webtoken)
        return response.status(401).json({"error":"Authentication failed.Token Missing","success":false});

        // return response.redirect(301,'http://localhost:6500/api/authorize/logout');

        // validate JWT token
        const {_id, role, firstName} = jwt.verify(webtoken,process.env.SIGN);

        const employeeRecord = await employeeProfessionalModel.findOne({_id,isActive:true}).populate('role','name');
        // console.log(employeeRecord);
        // if(verifiedData?.role)
        if(!employeeRecord)
          return response.status(401).json({"error":"Authentication failed. Invalid or missing token","success":false});

        request.role = employeeRecord.role.name;
        request.empId = _id;

        next();
      // return token;
    }catch(error){
      console.log(error.message);
      if(error instanceof jwt.JsonWebTokenError)
        return response.status(500).json({"error":"Invalid Token Received","success":false});
      if(error instanceof jwt.TokenExpiredError)
        return response.status(500).json({"error":"Token Expired","success":false});

      response.status(500).json({"error":"Internal Server Error","success":false});
    }
}

export {authenticate}