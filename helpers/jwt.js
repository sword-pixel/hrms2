import jwt from "jsonwebtoken";

async function generateJWTtoken (payload,response){
  let secreat_Key = process.env.SIGN || '';
  const token = jwt.sign(payload,secreat_Key,{expiresIn: 9*60*60*1000});

  response.cookie("webtoken",token,{
    maxAge:9*60*60*1000,
    httpOnly : true,
    strict : false,
    samesite: "None",
    secure : process.env.STATUS === 'production'
  });

}


export default generateJWTtoken;