//defino controlador para el manejo de CRUD
const ticketCtrl = require('./../controllers/ticket.controller');
//creamos el manejador de rutas
const express = require('express');
const router2 = express.Router();
//definimos las rutas para la gestion de ticket
router2.get('/', ticketCtrl.getTickets);
router2.post('/', ticketCtrl.createTicket);
router2.get('/categoria/:categoriaEspectador', ticketCtrl.getTicketsCategoria);
router2.get('/id/:id', ticketCtrl.getTicketId);
router2.put('/:id', ticketCtrl.editTicket);
router2.delete('/:id', ticketCtrl.deleteTicket);
//exportamos el modulo de rutas
module.exports = router2;