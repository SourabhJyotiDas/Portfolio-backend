import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import user from "./routes/user.js";
import project from "./routes/project.js";
import path from "path";

const __dirname = path.resolve();
const app = express();


dotenv.config({ path: "./config/config.env" });

app.use(cors(
   {
      origin: ["*"],
      // origin: ["http://localhost:3000", "https://sourabh-jyoti-das.vercel.app"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
   }
));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "./client/build")))    // deploy only

app.get('/', async (req, res) => {
   res.sendFile(path.join(__dirname, './client/build/index.html'));
});


// app.get("/", (req, res) => {
//    res.send("<h1>Working Fine</h1>");
// });

app.use("/api/v1", user);
app.use("/api/v1", project);

export default app;
