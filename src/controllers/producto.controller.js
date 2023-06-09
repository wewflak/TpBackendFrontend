const Producto = require('../models/producto');
const productoCtrl = {}
productoCtrl.getProductos = async (req, res) => {
    var productos = await Producto.find();
    res.json(productos);
}
productoCtrl.createProducto = async (req, res) => {
    console.log(req.body); 
    var producto = new Producto(req.body);
    try {
        await producto.save();
        res.json({
            'status': '1',
            'msg': 'Producto guardado.'})
        } catch (error) {
            res.status(400).json({
                'status': '0',
                'error': error,
                'msg': 'Error procesando operacion.'})
        }
}
productoCtrl.getProductosDestacados = async (req, res) => {
    var productos = await Producto.find({destacado:true});
    res.json(productos);
}
productoCtrl.editProducto = async (req, res) => {
    const vproducto = new producto(req.body);
    try {
    await Producto.updateOne({_id: req.body._id}, vproducto);
    res.json({
    'status': '1',
    'msg': 'Producto updated'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
    }
    productoCtrl.deleteProducto = async (req, res)=>{
        try {
        await Producto.deleteOne({_id: req.params.id});
        res.json({
        status: '1',
        msg: 'Producto removed'
        }) 
        } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
        }
        }
        module.exports = productoCtrl;