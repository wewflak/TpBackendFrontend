import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets: Array<Ticket>
  ticketsb: Array<Ticket>
  ticketsc: Array<Ticket>
  dnis:Array<string>
  totalE:number
  totalL:number
  ticketAux!: Ticket
  constructor(private ticketService:TicketService,
              private router:Router){
    this.totalE=0;
    this.totalL=0;
    this.tickets = new Array<Ticket>();
    this.ticketsb = new Array<Ticket>();
    this.ticketsc = new Array<Ticket>();
    this.dnis = new Array<string>();
      this.listaTickets();
      this.ticketsLocal();
      this.ticketsExtranjero();

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  prueba(){
    this.ticketService.getTickets().subscribe(
      result=>{
        console.log(result)
      },
      error=>{
        console.log(error)
      }
    )
  }
  listaTickets(){
    this.ticketService.getTickets().subscribe(
      result=>{
        console.log(result[0].Espectador.dni +' aaaaaaaaa')
        for(let i=0; i<result.length;i++){
        var nuevo = new Ticket(
          result[i].fechaCompra,
          result[i].categoriaEspectador,
          result[i].precioTicket,
          result[i]._id
        )
        this.dnis.push(result[i].Espectador.dni)
        this.tickets.push(nuevo)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  getEspectadorDni(idEspectador: string): string {
    console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOO")
    var entro:boolean
    entro=true
    var dni:string="a"
    if(entro){
    this.ticketService.getEspectadorId(idEspectador).subscribe(
      result=>{
        console.log(result)
        dni = result.dni
      },
      error=>{
        console.log(error)
      }
    );
  }else{
  return "a"
  }
  return dni;
}
  ticketsLocal(){
    //this.ticketsb=this.ticketService.getResumenL();
    
   // this.ticketsb.forEach(i=> this.totalL= this.totalL + i.precioCobrado);
  }
  agregarTicket(){
    this.router.navigate(['punto5' ,0] )
  }
  ticketsExtranjero(){
    //this.ticketsc=this.ticketService.getResumenE();
    //this.ticketsc.forEach(e=> this.totalE= this.totalE + e.precioCobrado)

  }
  modificarTicket(object : Ticket){
    //this.router.navigate(['punto5',object.id])
}
  // eliminarTicket(object: Ticket){
  //   if(object.tipoEspectador=='l'){
  //     this.ticketsb.splice(object.id)
  //   }else{
  //     if(object.tipoEspectador=='e'){
  //       this.ticketsc.splice(object.id)
  //     }
  //   }
    //this.ticketService.deleteTicket(object)
  //}
}

