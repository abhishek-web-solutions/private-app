import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import { socketHandler } from "./sockets/socket.js";
import { group } from "console";

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

const io = new Server(server, {
  cors: { origin: "*" },
});

socketHandler(io);

server.listen(5000, () => console.log("Server running on 5000"));
