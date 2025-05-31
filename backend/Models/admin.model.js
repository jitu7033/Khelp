import pool from '../config/db.js';


export const getAdminByEmail = async (email) => {
    const [row] = await pool.query('SELECT * FROM admin where email = ?', [email]);
    return row.length > 0 ? row[0] : null;
}

export const getAdminByuserName = async(username) => {
  const [row] = await pool.query('SELECT * FROM admin where username = ?', [username]);
    return row.length > 0 ? row[0] : null;
}

export const createAdmin = async (username,firstname,lastname,mobile,email,password,aadhar,address,pincode,district,state,country) => {
  const [result] = await pool.query('INSERT INTO admin(username,firstname,lastname,mobile,email,password,aadhar,address,pincode,district,state,country) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [username,firstname,lastname,mobile,email,password,aadhar,address,pincode,district,state,country]);
  
  return result.insertId;
}




// admin have access to add the price of the crops 

export const createCropsPriceByAdmin = async (crop_type_id,crop_type,businessman_id,price,unit) => {

  console.log("crop type id " ,crop_type," ", crop_type_id);

    const [id] = await pool.query('SELECT * FROM crop_types WHERE crop_id = ? AND trim(type_name) = ?',[crop_type_id,crop_type]);
    console.log(id);
    const crop_id = id[0].id;
    const [result] = await pool.query('INSERT INTO prices(crop_type_id,businessman_id,price,unit) VALUES(?,?,?,?)', [crop_id,businessman_id,price,unit]);
    return result.insertId;
}


// get all crops price by crop type id 

export const getAllCropsPriceByCropTypeid = async (businessman_id,crop_id, crop_type) => {
  console.log("businessman_id", businessman_id);
  console.log("crop_id", crop_id);
  
  const [id] = await pool.query('SELECT id FROM crop_types WHERE crop_id = ? AND trim(type_name) = ?', [crop_id, crop_type]);

  console.log("id", id);
  const crop_type_id = id.length > 0 ? id[0].id : '';
  console.log("crop_type_id", crop_type_id);

  if(!crop_type_id) {
    return null;
  }

  const [row] = await pool.query('SELECT * FROM prices WHERE crop_type_id = ? AND businessman_id = ?', [crop_type_id, businessman_id]);
  return row.length > 0 ? row : null;
}

export const deleteCropsPriceById = async (price_id, adminId) => {
  const [result] = await pool.query('DELETE FROM prices WHERE id = ? AND businessman_id = ?', [price_id, adminId]);
  return result.affectedRows > 0;
}