import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";



dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({ origin: "*" }));
app.use(express.json());


//@ts-ignore
// Signup Route
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await prisma.user.create({
        data: { username, password: hashedPassword },
      });
  
      res.json({ message: "User registered", user });
    } catch (error) {
      if ((error as any).code === "P2002") {
        return res.status(400).json({ error: "Username already taken" });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

//@ts-ignore
  // Sign-in Route
app.post("/signin", async (req, res) => {
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
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

