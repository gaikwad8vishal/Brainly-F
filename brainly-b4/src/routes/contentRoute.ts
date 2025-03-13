import express from "express";
import { addContent, deleteContent } from "../controllers/contentController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = express.Router();

//@ts-ignore
router.post("/add", authenticateUser, addContent); 
//@ts-ignore
router.delete("/delete/:id", authenticateUser, deleteContent);


export default router;
