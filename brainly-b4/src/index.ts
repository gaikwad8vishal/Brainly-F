import express from "express";
import signupRoute from "./routes/signupRoute";
import signinRoute from "./routes/signinRoute";
import contentRoutes from "./routes/contentRoute";
import cors from "cors";
import  prisma  from "@prisma/client";


const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173", // Frontend ka URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP Methods
      allowedHeaders: ["Content-Type", "Authorization"], // Custom Headers
      credentials: true, // Cookies Allow Karne Ke Liye
    })
  );
  

app.use("/api", signupRoute);
app.use("/api", signinRoute);
app.use("/content", contentRoutes);

app.delete("/content/:id", async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    
    // Prisma ka use karke note delete karo

    await prisma.note.delete({
      where: { id: noteId },
    });

    res.json({ success: true, message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(3000, () => console.log("Server running on port 3000"));
