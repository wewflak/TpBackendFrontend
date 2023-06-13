import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  espectadorFound!:Espectador
  ticket!:Ticket
  fechaSeleccionada!:string
  ticketFound!:Ticket
  dni!:string
  modify:boolean=false
  received!:string
  idEspectador!:string
  constructor(private ticketService: TicketService, private router: Router, private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) {
    this.espectadores = new Array<Espectador>()
  }

  ngOnInit(): void {
    this.getEspectadores()
    this.route.params.subscribe(params=>{
      let data = params['data']
      
      console.log(data + data.length)
      this.received = data
      if(this.received.length!=0 ){
        this.modify=true
      }
    })
    this.findTicket()
    var fechaWork:Date
    fechaWork = new Date(this.ticketFound.fechaCompra)
    this.fechaSeleccionada = this.formatDateForInput(fechaWork);
  }
  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  findTicket(){
    this.ticketService.getTicketId(this.received).subscribe(
      result=>{
        console.log(result)
        this.ticketFound=result;
        console.log(this.ticketFound.Espectador + ' id')
        var id:string=this.ticketFound.Espectador.toString()
        console.log(id + ' AAAAAAAAAAAAA')
        this.ticketService.getEspectadorId(id).subscribe(
          result=>{
            console.log(result)
            this.espectadorFound = result
          },
          error=>{
            console.log(error)
          }
        )
      },
      error=>{
        console.log(error)
      }
    )
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
  modifyTicket(){
    var idTicket: string
    idTicket = this.received
    console.log(this.ticketFound.idTicket + ' variable: ' + idTicket)
    console.log(this.idEspectador+' '+this.fechaSeleccionada + '  '+ this.categoria + '  ' + this.precio + ' ' + this.idEspectador)
    this.ticket = new Ticket(
      idTicket,
      this.ticketFound.id,
      this.ticketFound.fechaCompra,
      this.ticketFound.categoriaEspectador,
      this.ticketFound.precioTicket,
      this.ticketFound.Espectador
    )
    console.log(JSON.stringify(this.ticket) + ' modificar' +  ' idEspectador' + this.ticket.Espectador)
    var idEspectador:string = this.ticket.Espectador.toString()
    this.ticketService.editTicket(this.ticketFound.fechaCompra, this.ticketFound.categoriaEspectador, this.ticketFound.precioTicket, idEspectador, idTicket).subscribe(
      result=>{
        if(result.status == '1'){
          idTicket = result._id
          console.log(idTicket)
          alert(result.msg)
          this.router.navigate(['ticket'])
        }
      },
      error=>{
        alert(error.msg)
      }
    )

  }
  addTicket(){
    var idTicket: string
    idTicket = "a"
    console.log(this.idEspectador+' '+this.fecha.toString() + '  '+ this.categoria + '  ' + this.precio + ' ' + this.idEspectador)
    this.ticket = new Ticket(
      idTicket,
      this.idEspectador,
      this.fecha.toString(),
      this.categoria,
      this.precio,
      this.espectador
    )
    console.log(JSON.stringify(this.ticket))
    this.ticketService.createTicket(this.ticket.fechaCompra, this.ticket.categoriaEspectador, this.ticket.precioTicket, this.ticket.id).subscribe(
      result=>{
        if(result.status == '1'){
          idTicket = result._id
          console.log(idTicket)
          alert(result.msg)
          this.router.navigate(['ticket'])
        }
      },
      error=>{
        alert(error.msg)
      }
    )
  }
}
