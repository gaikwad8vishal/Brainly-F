

import express from "express";
import signupRoute from "./routes/signupRoute";
import signinRoute from "./routes/signinRoute";
import contentRoutes from "./routes/contentRoute";



const app = express();
app.use(express.json());

app.use("/api", signupRoute);
app.use("/api", signinRoute);
app.use("/content", contentRoutes);


app.listen(3000, () => console.log("Server running on port 3000"));
