
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (token)=> {
   console.log(token);
   return jwt.verify(token,process.env.JWT_KEY, (err,decoded) => {
      if(err){
         return false;
      }else{
         return decoded;
      }
   })
}