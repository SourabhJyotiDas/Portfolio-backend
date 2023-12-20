import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import user from "./routes/user.js";
import project from "./routes/project.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors(
   {
      origin: ["https://sourabhjyoti-das.netlify.app", "http://localhost:3000"],
      credentials: true,
      methods: ["POST", "GET", "PUT", "DELETE"]
   }
));

app.get("/", (req, res) => {
   res.send("<h1>Working Fine</h1>");
});

// Routes
app.use("/api/v1", user);
app.use("/api/v1", project);

export default app;
