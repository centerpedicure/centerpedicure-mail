import { Router } from "express";
import emailController from "../controller/email-controller.js";

const router = Router();

router.post("/send-message", emailController.sendEmail);

export default router;