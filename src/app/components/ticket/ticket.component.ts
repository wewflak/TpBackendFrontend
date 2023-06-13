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
          result[i]._id,
          result[i].Espectador._id,
          result[i].fechaCompra,
          result[i].categoriaEspectador,
          result[i].precioTicket,
          result[i].Espectador
        )
        console.log(nuevo.Espectador.dni + '   dNI lista general')
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
    this.ticketService.getTicketsCategoria("local").subscribe(
      result=>{
        for(let i=0; i<result.length;i++){
        var nuevo = new Ticket(
          result[i]._id,
          result[i].Espectador._id,
          result[i].fechaCompra,
          result[i].categoriaEspectador,
          result[i].precioTicket,
          result[i].Espectador
        )
        this.dnis.push(result[i].Espectador.dni)
        this.ticketService.getEspectadorId(result[i].Espectador).subscribe(
          result=>{
            console.log(result)
            nuevo.Espectador = result
          },
          error=>{
            console.log(error)
          }
        )
        console.log(JSON.stringify(result[i]._id) + ' dni de espectador local: ' + result[i].Espectador.dni)
        this.ticketsb.push(nuevo)
        }
        this.totalL = this.ticketsb.length
      },
      error=>{
        console.log(error)
      }
    )
  }
  agregarTicket(){
    this.router.navigate(['punto5' ,0] )
  }
  ticketsExtranjero(){
    this.ticketService.getTicketsCategoria("extranjero").subscribe(
      result=>{
        for(let i=0; i<result.length;i++){
        var nuevo = new Ticket(
          result[i]._id,
          result[i].Espectador._id,
          result[i].fechaCompra,
          result[i].categoriaEspectador,
          result[i].precioTicket,
          result[i].Espectador
        )
        this.dnis.push(result[i].Espectador.dni)
        this.ticketService.getEspectadorId(result[i].Espectador).subscribe(
          result=>{
            console.log(result)
            nuevo.Espectador = result
          },
          error=>{
            console.log(error)
          }
        )
        this.ticketsc.push(nuevo)
        }
        this.totalE = this.ticketsc.length
      },
      error=>{
        console.log(error)
      }
    )

  }
  modificarTicket(object : Ticket){
    this.router.navigate(['ticket-form', {data:object.idTicket}])
}
  eliminarTicket(object: Ticket){
    this.ticketService.deleteTicket(object.idTicket).subscribe(
      result=>{
        console.log(result)
        const index = this.tickets.findIndex(t => t.id === object.id);
        if (index !== -1) {
          this.tickets.splice(index, 1);
          if(object.categoriaEspectador == "local"){
            console.log("local")
          this.ticketsb.splice(index, 1);
          }else if(object.categoriaEspectador == "extranjero"){
            console.log("extranjero")
          this.ticketsc.splice(index, 1);
          }
        }
      },
      error=>{
        console.log(error)
      }
    )
}
}
