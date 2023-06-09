const mongoose = require('mongoose');
const {Schema} = mongoose;
const Espectador = require('./espectador'); 
const TicketSchema = new Schema({
    fechaCompra: {type: String, required: true},
    categoriaEspectador: {type:String, required: true},
    precioTicket: {type:Number, required:true},
    Espectador: { type: Schema.Types.ObjectId, ref: 'Espectador', required: true }
})
module.exports = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);