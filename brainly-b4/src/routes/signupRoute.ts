


import express from "express";
import { Signup } from "../controllers/signupController";

const router = express.Router();
router.post("/signup", Signup );

export default router;
