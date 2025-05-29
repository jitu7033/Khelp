import { createAdmin, getAdminByEmail, getAdminByuserName } from "../Models/admin.model.js";
import { generateToken } from "../utils/token.utils.js";


export const addAdmin = async (req,res) => {
    const { username, firstname, lastname, mobile, email, aadhar, address, pincode, district, state, country, password, confirmPassword } = req.body;

    if(password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    if (!username || !firstname || !mobile || !email || !aadhar || !address || !pincode || !district || !state || !country || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const existingAdminByUsername = await getAdminByuserName(username);
    const existingAdminByEmail = await getAdminByEmail(email);

    if(existingAdminByEmail || existingAdminByUsername) {
        return res.status(400).json({ error: "Admin with this username or email already exists" });
    }
    
    try{
      const adminId = await createAdmin(username, firstname, lastname, mobile, email, password, aadhar, address, pincode, district, state, country);

      res.status(201).json({ message: "Admin created successfully", adminId: adminId });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



// login admin 

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try{
    const admin = await getAdminByEmail(email);

    
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateToken(admin);
    res.cookie("token", token);
    res.status(200).json({ message: "Admin logged in successfully", admin: admin, token: token });

  }catch (error) {

    return res.status(500).json({ error: "Internal server error" });
  }

}