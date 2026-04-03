const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { startGPS } = require("./gpsSerial");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// 🌐 Socket connection
io.on("connection", (socket) => {
  console.log("🟢 Frontend connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Frontend disconnected:", socket.id);
  });
});

// 🚀 Start GPS serial reading
startGPS(io);

// 🟢 Start server
server.listen(5000, () => {
  console.log("🌍 Server running at http://localhost:5000");
});


