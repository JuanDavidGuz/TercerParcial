const Pedido = require("../models/Pedido");
const Coordenadas = require("../models/Coordenadas");

let usuarios = {};
let mensajero;

const socketController = (socket, io) => {
  console.log("Cliente conectado", socket.id);

  socket.emit("usuarios", Object.keys(usuarios));

  usuarios[socket.id] = socket;

  socket.on("disconnect", () => {
    delete usuarios[socket.id];
    io.emit("usuarios-activos");
  });

  socket.on("crear-pedido", async (socketId) => {
    const fecha = new Date();
    const pedido = new Pedido({ fecha });
    await pedido.save();

    setInterval(async () => {
      let coor = new Coordenadas();
      coor.latitud = Math.random() * (4.8 - 4.7) + 4.7;
      coor.longitud = Math.random() * (-74.1 - -74.2) + -74.2;
      coor.pedido_id = pedido._id;
      await coor.save();
      usuarios[socketId].to(socket.id).emit("coordenadas", coor);
    }, 2000);
  });
};

module.exports = { socketController };
