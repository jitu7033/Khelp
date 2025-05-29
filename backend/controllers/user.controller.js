import { isLoggedIn } from "../Middleware/auth.middleware.js";
import { createUser, findUserByaadhar, findUserByemail , findUserByusername} from "../Models/user.model.js";
import { generateToken } from "../utils/token.utils.js";



export const loginUser = async (req,res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({error : "all filed required"});
  }
  try{

    const user = await findUserByemail(email);
    console.log(" this user is printing form the user controller line nO 14 ke passs :  ", user);
  

    if(!user){
      return res.status(404).json({error : "user not found"})
    }

    if(user.password != password){
      return res.status(401).json({error : "password doesn't matched "});
    }
    const token = generateToken(user);
    res.cookie("token", token);
    // console.log(" token " , token);
    res.status(201).json({message : "user logged in Successfully", user : user, token : token})
  }
  catch(error){
    // console.log(error);
    return res.status(500).json({error : "internal server issue", error});
  }

}



export const adduser = async (req,res) => {

  const {username,firstname,lastname,mobile,email,aadhar,address,pincode,district,state,country,password,confirmPassword } = req.body;

  // console.log(username);

  if(!username || !firstname || !mobile || !email || !aadhar || !address || !pincode || !district || !state || !country ||!password || !confirmPassword){
    return res.status(400).json({error : "All field are required"});
  }

  if(password !== confirmPassword){
    res.status(400).json({error: "password are not matched"});
  }
  try{

    // check if user already exist 

    const existingUser = await findUserByusername(username);
    const existingUserByemail = await findUserByemail(email);
    const existingUserByaadhar = await findUserByaadhar(aadhar);

    if(existingUser || existingUserByaadhar || existingUserByemail){

      return res.status(409).json({error : "username already exist"});
    }
    const id = await createUser(username,firstname,lastname,mobile,email,aadhar,address,pincode,district,state,country,password);
    // console.log("register successfully and this console is from user.controller.js line no : 60 -> ",id);
    res.status(201).json({message : "User added successfully ", userId : id});

  }catch(error){
    // console.log("error adding user ");
    res.status(500).json({error : "Internal server error ", error});
  }
}

// view profile of user 
