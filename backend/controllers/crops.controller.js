import { createCrops, createCropsType, getAllCrops, getAllCropsTypeByCropId } from "../Models/crops.model.js";
import { findEmployeeByEmpId } from "../Models/employee.model.js";


export const addCrops = async (req, res) => {

  const {name, content, image,employee_id} = req.body;



  // console.log("employee_id: ",employee_id);

  const existEmployeeId = await findEmployeeByEmpId(employee_id);

  if(!existEmployeeId) {
    return res.status(404).json({error: "Employee not found"});
  }

  if(!name || !content || !image || !employee_id) {
    return res.status(400).json({error: "All fields are required"});
  }

  try{
    const cropId = await createCrops(name, content, image, employee_id);
    res.status(201).json({message : "Crop added successfully", cropId: cropId});
  }catch(error) {
    console.error("Error adding crop:", error);
    res.status(500).json({error: "Internal server error"});
  }
} 



// get crops 

export const getCrops = async (req,res) => {

  try{
    const crops = await getAllCrops();

    if(!crops || crops.length === 0) {
      return res.status(404).json({error: "No crops found"});
    }

    res.status(200).json({message: "Crops fetched successfully", crops: crops});


  }catch(error) {
    console.error("Error fetching crops:", error);
    return res.status(500).json({error: "Internal server error"});
  }
}




// add crops type 

export const addCropsType = async (req, res) => {
  const { crop_id, type_name, image, content } = req.body;

  if (!crop_id || !type_name || !image || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const typeId = await createCropsType(crop_id, type_name, image, content);
    res.status(201).json({ message: "Crop type added successfully", typeId: typeId });
  } catch (error) {
    console.error("Error adding crop type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// get crops type by crop id

export const getCropsTypeByCropId = async (req, res) => {
  const { crop_id } = req.params;
  if (!crop_id) {
    return res.status(400).json({ error: "Crop ID is required" });
  }

  try {
    const cropTypes = await getAllCropsTypeByCropId(crop_id);
    
    if (!cropTypes || cropTypes.length === 0) {
      return res.status(404).json({ error: "No crop types found for this crop" });
    }

    res.status(200).json({ message: "Crop types fetched successfully", cropTypes: cropTypes });
  } catch (error) {
    console.error("Error fetching crop types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
} 