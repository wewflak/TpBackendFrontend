const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}
transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find().populate('Espectador');
    res.json(transacciones);
}
transaccionCtrl.createTransaccion = async (req, res) => {
    console.log(req.body);
    const { cantidadOrigen, tasaConversion } = req.body;
    const cantidadDestino = cantidadOrigen * tasaConversion;
    var transaccion = new Transaccion({ ...req.body, cantidadDestino });
    try {
        await transaccion.save();
        res.json({
            'status': '1',
            'msg': 'Transaccion guardada.'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'error': 'error',
            'msg': 'Error procesando operacion.'
        });
    }
}
transaccionCtrl.getTransaccionesEmail = async (req, res) => {
    const transaccion = await transaccion.findOne({ email:req.params.email });
    res.json(transaccion);
}
transaccionCtrl.getTransaccionesDivisas = async (req, res) => {
    const { monedaOrigen, monedaDestino} = req.params
    const transacciones = await Transaccion.find({ monedaOrigen, monedaDestino });
    res.json(transacciones);
}
module.exports = transaccionCtrl;