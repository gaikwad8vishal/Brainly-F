import express from "express";
import { signin } from "../controllers/signinCorntroller";

const router = express.Router();

//@ts-ignore
router.post("/signin", signin );

export default router;
