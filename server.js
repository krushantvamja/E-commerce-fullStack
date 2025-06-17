import express from "express"
import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT ||3030;

app.listen(PORT, () => console.log(`app is running at port ${PORT}`));
