import express from 'express';
import { addAdmin, loginAdmin } from '../controllers/admin.controller.js';
import { isLoggedIn } from '../Middleware/auth.middleware.js';
import { createCropsPriceByAdmin, deleteCropsPriceById, getAllCropsPriceByCropTypeid } from '../Models/admin.model.js';

const router = express.Router();

router.post("/register", addAdmin);
router.post("/login", loginAdmin);

// get profile route

router.get("/profile", isLoggedIn, (req,res) => {
  res.status(200).json({message: "Admin profile", admin: req.admin});
})


// add price by admin 

router.post("/add/price", isLoggedIn, async (req,res) => {
  const {crop_type_id, crop_type, price, unit} = req.body;
  const adminId = req.admin.id;



  // console.log("Admin ID:", req.body);

  // console.log("Crop Type ID:", crop_type_id);
  // console.log("Price:", price); 
  

  if(!crop_type_id || !price || !unit){
    return res.status(400).json({error: "All fields are required"});
  }
  if(!adminId) {
    return res.status(401).json({error: "Unauthorized"});
  }
  try{
    const id = await createCropsPriceByAdmin(crop_type_id, crop_type,  adminId, price, unit);
    console.log(id);
    res.status(201).json({message: "Price added successfully", priceId: id});
  }
  catch(error) {
    console.error("Error adding price:", error);
    res.status(500).json({error: "Internal server error"});
  }

})


// get all prices by admin

router.get("/get/prices",isLoggedIn, async(req,res) => {
  const adminId = req.admin.id;
  const cropId = req.headers.crop_id;
  const cropType = req.headers.crop_type;

  // console.log("Admin ID:", adminId);
  // console.log("Crop ID:", cropId);
  // console.log("Crop Type:", cropType)

  const prices = await getAllCropsPriceByCropTypeid(adminId, cropId, cropType);
  // console.log("Prices:", prices);

  if(!prices || prices.length === 0) {
    return res.status(404).json({error: "No prices found for the given crop type"});
  }

  if(prices == null) {
    return res.status(404).json({error: "No prices found for the given crop type"});
  }
  res.status(200).json({message: "Prices fetched successfully",prices: prices});
  if(!prices || prices.length === 0) {
    return res.status(404).json({error: "No prices found"});
  }
})


router.delete("/delete/price", isLoggedIn, async (req,res) => {
    const deleteId = req.headers.price_id;
    const adminId = req.admin.id;

    try{
      const id = await deleteCropsPriceById(deleteId, adminId);

      if(id == null) {
        return res.status(404).json({error: "Price not found"});
      }
      res.status(200).json({message: "Price deleted successfully", priceId: id});
    }
    catch(error) {
      console.error("Error deleting price:", error);
      res.status(500).json({error: "Internal server error"});
    }
})

export default router;