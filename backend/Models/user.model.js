import pool from "../config/db.js";



// find user by user name
export const findUserByusername = async(username) => {
  const [rows] = await pool.query('select * from user where username = ?',[username]);
  return rows.length > 0 ? rows[0] : null;
}


export const findUserByemail = async (email) => {
  const [rows] = await pool.query('select * from user where email = ?',[email]);
  return rows.length > 0 ? rows[0] : null;
}


export const findUserByaadhar = async (aadhar) => {
  const [rows] = await pool.query('select * from user where aadhar = ?',[aadhar]);
  return rows.length > 0 ? rows[0] : null;
}


// Add new User 
export const createUser = async (username,firstname,lastname,mobile,email,aadhar,address,pincode,district,state,country,password)=> {
  const [result] = await pool.query('INSERT INTO user(username,firstname,lastname,mobile,email,aadhar,address,pincode,district,state,country,password) Values(?,?,?,?,?,?,?,?,?,?,?,?)',[username,firstname,lastname,mobile,email,aadhar,address,pincode,district,state,country,password]);
  
  return result.insertId;
}

// get all the prices from data base 




export const  getAllPricesByCropAndType = async (req, res) => {
  const { crop_id, crop_type } = req.headers;
  const type_name = crop_type ? crop_type.toLowerCase() : null;

  // console.log("crop_id:", crop_id);
  // console.log("type_name:", type_name);



  if (!crop_id || !type_name) {
    return res.status(400).json({ message: "Missing crop_id or type_name" });
  }

  try {
    const query = `
      SELECT 
        prices.id AS price_id,
        prices.price,
        prices.unit,
        prices.date,
        admin.firstname,
        admin.lastname,
        admin.mobile,
        admin.district,
        admin.state,
        admin.image
      FROM prices
      JOIN crop_types ON prices.crop_type_id = crop_types.id
      JOIN admin ON prices.businessman_id = admin.id
      WHERE crop_types.crop_id = ? AND trim(crop_types.type_name) = ?
    `;
    
    const [results] = await pool.execute(query, [crop_id, type_name]);
    return res.status(200).json({ prices: results });
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
