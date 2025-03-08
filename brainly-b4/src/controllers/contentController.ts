import { Request, Response } from "express";
import prisma from "../models/User";

export const addContent = async (req: Request, res: Response) => {
  try {
    const { title, description, embedCode, link } = req.body;

    
    const userId = (req as any).userId; // Auth middleware se milna chahiye

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        embedCode,
        link,
        user: { connect: { id: userId } }, // Yaha pe user connect karna hai
      },
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
