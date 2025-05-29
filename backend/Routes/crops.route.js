import express from 'express';

import {addCrops, addCropsType, getCrops, getCropsTypeByCropId} from '../controllers/crops.controller.js';


const router = express.Router();

router.post("/add", addCrops);
router.get("/get", getCrops);
router.post("/add/type", addCropsType)
router.get("/get/type/:crop_id", getCropsTypeByCropId);


export default router;