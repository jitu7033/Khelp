import express from "express";
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.route.js"


const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

connectDb();

app.get("/", (req, res) => {
    res.send("hello server started");
})

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log("server started port no ", PORT)
})