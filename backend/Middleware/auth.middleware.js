import pool from "../config/db.js";
import { getAdminByEmail } from "../Models/admin.model.js";
import { findUserByemail } from "../Models/user.model.js";
import jwt from 'jsonwebtoken';


export const isLoggedIn = async (req,res,next) => {
  
  // console.log(req.headers);

  if(!req.headers.authorization){
    return res.status(401).json({error : "you need to logged in first"});
  }
  // console.log("Authorization header: ", req.headers.Authorization);
  try{
    let decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    // console.log("Decoded token: ", decode);
    let user = await findUserByemail(decode.email);
    let admin = await getAdminByEmail(decode.email);
    
    if(user){
      req.user = user;
    }
    else if(admin){
      req.admin = admin;
    }
    next();
  }
  catch(error){
    console.error("Error in isLoggedIn middleware:", error);
    return res.status(500).json({error : "some thing wrong"});
  }
}