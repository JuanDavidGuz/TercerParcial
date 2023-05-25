const express = require("express");
require("dotenv").config();
const { dbConnection } = require("../database/config");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server, this.headers);
    this.connectToDB();
    this.sockets();

    this.port = process.env.PORT;
  }

  async connectToDB() {
    await dbConnection();
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server is running on port", this.port);
    });
  }
}

module.exports = Server;
