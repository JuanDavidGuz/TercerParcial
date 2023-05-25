const { Schema, model } = require('mongoose')

const PedidoSchema = Schema({
    fecha: {
      type: Date,
      require: true
    }
})

PedidoSchema.virtual('coordenadas', {
  ref: 'Coordenadas',
  localField: 'id',
  foreignField: 'pedido_id',
  justOne: false
})

PedidoSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject()
  return object
})

module.exports = model('Pedido', PedidoSchema)