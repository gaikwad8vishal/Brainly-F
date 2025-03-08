import express from "express";
import { addContent } from "../controllers/contentController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

//@ts-ignore

router.post("/add", authenticateUser, addContent); 
export default router;
