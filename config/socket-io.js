let io;
exports.socketConnection = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: JSON.parse(process.env.FRONTEND_URL),
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

exports.emitSchedule = () => {
  io.emit("reloadSchedule");
}

exports.emitBanner = () => {
  io.emit("reloadBanner");
}

exports.emitReload = () => {
  io.emit("reload");
}