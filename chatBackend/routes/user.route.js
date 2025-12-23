import express, { Router } from "express"
import { changeUserPassword, login, logout, registeruser, verifyEmailOtp } from "../controllers/user.controller.js";
import { loginSchema, registerSchema } from "../modules/User/user.validation.js";
import { validate } from "../middlewares/validate.js";
import { isLoggedIn } from "../middlewares/auth.js";

const route = express.Router();

route.post("/register", validate(registerSchema), registeruser);
route.post("/verifyEmail", verifyEmailOtp)
route.post("/login", validate(loginSchema), login);
route.post("/logout", isLoggedIn, logout);
route.post("/change-password", isLoggedIn, changeUserPassword);

export default route;