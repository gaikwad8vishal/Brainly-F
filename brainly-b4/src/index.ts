import express from "express";
import signupRoute from "./routes/signupRoute";
import signinRoute from "./routes/signinRoute";
import contentRoutes from "./routes/contentRoute";
import cors from "cors";


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



app.listen(3000, () => console.log("Server running on port 3000"));
