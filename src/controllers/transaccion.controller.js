const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}
transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.json(transacciones);
}
transaccionCtrl.createTransaccion = async (req, res) => {
    console.log(req.body);
	const {
		monedaOrigen,
		cantidadOrigen,
		monedaDestino,
		cantidadDestino,
		emailCliente,
		tasaConversion,
	} = req.body;
    const transaccion = new Transaccion({
		monedaOrigen,
		cantidadOrigen,
		monedaDestino,
		cantidadDestino,
		emailCliente,
		tasaConversion,
	});
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