const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}
transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.json(transacciones);
}
transaccionCtrl.createTransaccion = async (req, res) => {
    console.log(req.body+' controlller');
    const { monedaOrigen, cantidadOrigen, monedaDestino, cantidadDestino, tasaConversion, emailCliente } = req.body;

    const transaccion = new Transaccion({
        monedaOrigen,
        cantidadOrigen,
        monedaDestino,
        cantidadDestino,
        tasaConversion,
        emailCliente
    });
    console.log(JSON.stringify(transaccion.toObject()), transaccion.monedaOrigen, monedaOrigen, req.params.monedaOrigen)
    try {
        const transaccionGuardada = await transaccion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Transaccion guardada.',
            'transaccion': transaccionGuardada
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        });
    }
}
transaccionCtrl.getTransaccionesEmail = async (req, res) => {
    try {
        const transacciones = await Transaccion.find({ emailCliente: req.params.emailCliente });
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({
        status: '0',
        msg: 'Error retrieving transactions',
        });
    }
};
transaccionCtrl.getTransaccionesDivisas = async (req, res) => {
    const { monedaOrigen, monedaDestino} = req.params
    const transacciones = await Transaccion.find({ monedaOrigen, monedaDestino });
    res.json(transacciones);
}
module.exports = transaccionCtrl;