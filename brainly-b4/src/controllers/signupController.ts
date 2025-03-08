import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../models/User";



//@ts-ignore

export const Signup =  async (req:Request, res:Response) => {
    const { 
        username, 
        password 
    } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
    });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await prisma.user.create({
        data: { username, password: hashedPassword },
      });
  
      res.json({ 
        message: "User registered", user 
    });
    } catch (error) {
      if ((error as any).code === "P2002") {
        return res.status(400).json({ 
            error: "Username already taken" 
        });
      }
      res.status(500).json({ 
        error: "Something went wrong" 
    });
    }
  }  