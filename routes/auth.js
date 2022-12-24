import { Router } from "express";
import signUpController from "../controllers/signUpController.js";
import loginController from "../controllers/loginController.js";

const router = Router();

// signup
router.post("/signUp", signUpController.post);

// login
router.post("/logIn", loginController.post);

export default router;
