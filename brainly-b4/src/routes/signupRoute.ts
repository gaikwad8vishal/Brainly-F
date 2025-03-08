


import express from "express";
import { Signup } from "../controllers/signupController";

const router = express.Router();
//@ts-ignore
router.post("/signup", Signup );

export default router;
