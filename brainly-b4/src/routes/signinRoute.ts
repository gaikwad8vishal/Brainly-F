import express from "express";

import { Signin } from "../controllers/signinCorntroller";

const router = express.Router();


router.post("/signin", Signin );

export default router;
