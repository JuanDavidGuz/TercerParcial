const { Schema, model } = require("mongoose");

const CoordenadasSchema = Schema({
  latitud: {
    type: Number,
    require: true,
  },
  longitud: {
    type: Number,
    require: true,
  },
  pedido_id: {
    type: Schema.Types.ObjectId,
    ref: "Pedido",
  },
});

module.exports = model("Coordenadas", CoordenadasSchema);
