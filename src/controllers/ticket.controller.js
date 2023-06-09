const Ticket = require('../models/ticket');
const ticketCtrl = {}
ticketCtrl.getTickets = async (req, res) => {
    var tickets = await Ticket.find().populate('Espectador');
    res.json(tickets);
}
ticketCtrl.createTicket = async (req, res) => {
    console.log(req.body); 
    var ticket = new Ticket(req.body);
    try {
        await ticket.save();
        res.json({
            'status': '1',
            'msg': 'ticket guardado.'})
        } catch (error) {
            res.status(400).json({
                'status': '0',
                'error': error,
                'msg': 'Error procesando operacion.'})
        }
}
ticketCtrl.getTicketsCategoria = async (req, res) => {
    const ticket = await Ticket.findOne({ categoriaEspectador:req.params.categoriaEspectador });
    res.json(ticket);
}
ticketCtrl.editTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticketData = req.body;

        const result = await Ticket.findByIdAndUpdate(ticketId, ticketData);

        if (result) {
            res.json({
                'status': '1',
                'msg': 'Ticket updated'
            });
        } else {
            res.json({
                'status': '0',
                'msg': 'Ticket not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error processing the operation'
        });
    }
};

    ticketCtrl.deleteTicket = async (req, res)=>{
        try {
            await Ticket.deleteOne({_id: req.params.id});
                res.json({
                    status: '1',
                    msg: 'Ticket removed'
                }) 
        } catch (error) {
                res.status(400).json({
                    'status': '0',
                    'msg': 'Error procesando la operacion'
                }) 
        }
    }
module.exports = ticketCtrl;