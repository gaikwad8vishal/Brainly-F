import { Request, Response } from "express";
import prisma from "../models/User";

export const addContent = async (req: Request, res: Response) => {
  try {
    const { title, description, embedCode, link } = req.body;

    
    const userId = (req as any).userId; // Auth middleware se milna chahiye

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newContent = await prisma.note.create({
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



///////////////


export const deleteUserContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId; // Auth se userId lena

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Check if content exists & belongs to the user
    const content = await prisma.note.findUnique({
      where: { id }, // ID as a string use hoga
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    if (content.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: Not your content" });
    }

    // ✅ Delete content
    await prisma.note.delete({ where: { id } });

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




export const getUserContent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Auth middleware se userId lena

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //  Fetch all content for this user
    const userContent = await prisma.note.findMany({
      where: { userId },
    });

    res.json(userContent);
  } catch (error) {
    console.error("Error fetching user content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
