import pool from "../config/db.js";


// add crops

export const createCrops = async (name, content, image, employee_id) => {
    const [result] = await pool.query('INSERT INTO crops(name, content, image, employee_id) VALUES(?,?,?,?)', [name,content,image,employee_id]);
    return result.insertId;
}


// get crops

export const getAllCrops = async () => {
  const [row] = await pool.query('SELECT * FROM crops');
  return row.length > 0 ? row : null;
}


// create crops type 

export const createCropsType = async (crop_id,type_name, image, content) => {
  const [result] = await pool.query('INSERT INTO crop_types(crop_id, type_name, image, content) VALUES(?,?,?,?)', [crop_id,type_name, image, content]);
  return result.insertId;
}


// get crops type by crop id 

export const getAllCropsTypeByCropId = async (crop_id) => {
  const [row] = await pool.query('SELECT * FROM crop_types WHERE crop_id = ?', [crop_id]);
  return row.length > 0 ? row : null;
}