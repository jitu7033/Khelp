import pool from "../config/db.js";


// check if employee exists

export const findEmployeeByEmpId = async (empId) => {
  const [rows] = await pool.query('SELECT * FROM employee WHERE emp_id = ?', [empId]);
  return rows.length > 0 ? rows[0] : null;
}
