import express from "express"
import authRoutes from "./route/auth.route.js"
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./route/message.route.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";

dotenv.config();



app.use(cookieParser());
app.use(express.json({ limit: '512kb' }));
app.use(express.urlencoded({ limit: '512kb', extended: true }));

app.use(cors({
    origin : "https://app-chat-frontend.vercel.app",
    credentials : true,

}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(5001,()=>{
    console.log("Server is running on port 5001");
    connectDB();
    
})