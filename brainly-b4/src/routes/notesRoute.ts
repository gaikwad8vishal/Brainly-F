import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middleware/authMiddleware"; // Import middleware

const prisma = new PrismaClient();
const router = express.Router();

//@ts-ignore

//Get Only Authenticated User’s Notes
router.get("/", authenticateUser, async (req: any, res) => {
  try {
    //@ts-ignore
    const notes = await prisma.note.findMany({
      where: { userId: req.userId }, // Sirf wahi user apne notes dekh sakta hai
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
//@ts-ignore

// Create Note for Authenticated Users Only
router.post("/", authenticateUser, async (req: any, res) => {
  const { title, description, link, embedCode } = req.body;
//@ts-ignore

  try {
    //@ts-ignore
    const note = await prisma.note.create({
      data: { title, description, link, embedCode, userId: req.userId },
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
