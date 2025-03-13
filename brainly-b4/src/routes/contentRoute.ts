import express from "express";
import { addContent, deleteUserContent, getUserContent } from "../controllers/contentController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = express.Router();

//@ts-ignore
router.post("/add", authenticateUser, addContent); 
//@ts-ignore
router.get("/all-content", authenticateUser, getUserContent);
//@ts-ignore
router.delete("/delete/:id", authenticateUser, deleteUserContent);


export default router;
