import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", todoRouter);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(3000, () => console.log("Server has started"));
