const Espectador = require('../models/espectador');
const espectadorCtrl = {}
espectadorCtrl.getEspectadores = async (req, res) => {
    var espectadores = await Espectador.find();
    res.json(espectadores);
}
espectadorCtrl.createEspectador = async (req, res) => {
    console.log(req.body); 
    var espectador = new Espectador(req.body);
    try {
        await espectador.save();
        res.json({
            'status': '1',
            'msg': 'Espectador guardado.'})
        } catch (error) {
            res.status(400).json({
                'status': '0',
                'error': error,
                'msg': 'Error procesando operacion.'})
        }
}
espectadorCtrl.getEspectador = async (req, res) => {
    const espectador = await Espectador.findOne({ dni: req.params.dni });
    res.json(espectador);
}
espectadorCtrl.getEspectadorId = async (req, res) => {
    const espectador = await Espectador.findById(req.params._id);
    res.json(espectador);
};

module.exports = espectadorCtrl;