import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../models/User";


export const Signin = async (req:Request , res:Response) => {
    const username = req.body.username;
    const password = req.body.password;



    //finding
    const user = await prisma.user.findUnique({ where: { username } });
    
    //if not exist
    if (!user) {
        return res.status(400).json({ 
            error: "Invalid credentials" 
        });}
  
    const isMatch = await bcrypt.compare(
        password, 
        user.password
    );

    //if not found 
    if (!isMatch) {
        return res.status(400).json({ 
            error: "Invalid credentials" 
        });}

    //@ts-ignore
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  
    res.json({ message: "Login successful" , token });
  }




