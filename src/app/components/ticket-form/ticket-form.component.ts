import { Component, OnInit } from '@angular/core';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  precio!:number
  fecha!:string
  categoria!:string
  espectadores!:Array<Espectador>
  espectador!:Espectador
  ticket!:Ticket
  dni!:string
  idEspectador!:string
  constructor(private ticketService: TicketService) {
    this.espectadores = new Array<Espectador>()
  }

  ngOnInit(): void {
    this.getEspectadores()
  }
  getEspectadores(){
    this.ticketService.getEspectadores().subscribe(
      result=>{
        console.log(result)
        for(let i=0;i<result.length;i++){
          var nuevo = new Espectador(
            result[i].apellido,
            result[i].nombre,
            result[i].dni,
            result[i].email,
          )
          
        this.idEspectador = result[i]._id
        this.espectadores.push(nuevo)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  findEspectador(dni:string){
    this.ticketService.getEspectadorDni(dni).subscribe(
      result=>{
        console.log(result +'busquedaaaaaa')
        console.log(JSON.stringify(result) + ' seleccionado')
        this.espectador = new Espectador(
          result.apellido,
          result.nombre,
          result.dni,
          result.email
        )
        console.log(this.espectador.nombre + ' '+ this.espectador.apellido)
      },
      error=>{
        console.log(error)
      }
    )
  }
  addTicket(){
    console.log(this.fecha.toString() + '  '+ this.categoria + '  ' + this.precio + ' ' + this.idEspectador)
    this.ticket = new Ticket(
      this.fecha.toString(),
      this.categoria,
      this.precio,
      this.idEspectador
    )
    console.log(JSON.stringify(this.ticket))
    this.ticketService.createTicket(this.ticket).subscribe(
      result=>{
        if(result.status == '1'){
          alert(result.msg)
        }
      },
      error=>{
        alert(error.msg)
      }
    )
  }
}
