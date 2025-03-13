import { Server } from "socket.io";
import http from "http";
import express from "express";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

const io = new setDriver(server, {
  cor: {
    origin: [process.env.BASE_URL],
  },
});

const userSoketMap = {};
