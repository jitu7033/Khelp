import express from 'express';
import { adduser, loginUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../Middleware/auth.middleware.js';
import { getAllPricesByCropAndType } from '../Models/user.model.js';


const router = express.Router();

router.post("/register",adduser);
router.post("/login", loginUser);

router.get("/profile",isLoggedIn,(req,res) => {
    res.status(200).json({message: "User profile", user: req.user});
});

router.get("/get/price", getAllPricesByCropAndType);

export default router;