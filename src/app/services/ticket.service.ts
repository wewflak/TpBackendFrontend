import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  urlBase:string="http://localhost:3000/api"
  constructor(private _http:HttpClient) { }
  getTickets():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/ticket/', httpOptions)
  }
  getEspectadores():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/espectador/',httpOptions)
  }
  getEspectadorDni(dni:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/espectador/'+dni, httpOptions)
  }
  
  getEspectadorId(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/espectador/id/'+id, httpOptions)
  }
  getTicketsCategoria(tipo:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    console.log(this.urlBase+'/ticket/categoria/'+tipo)
    return this._http.get(this.urlBase+'/ticket/categoria/'+tipo, httpOptions)
  }
  
  getTicketId(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    
    console.log(this.urlBase+'/ticket/'+id)
    return this._http.get(this.urlBase+'/ticket/id/'+id, httpOptions)
  }
  createTicket(fecha:string, categoria:string, precio:number, id:string):Observable<any>{
    const ticketData = {
      fechaCompra: fecha,
      categoriaEspectador: categoria,
      precioTicket: precio,
      Espectador: id
    };
    let httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    }
    
    let body = JSON.stringify(ticketData)
    console.log(JSON.stringify(ticketData) + '   Enviado  ')
    return this._http.post(this.urlBase+'/ticket/', body,httpOptions)
  }
  
  editTicket(fecha:string, categoria:string, precio:number, id:string, idTicket:string):Observable<any>{
    const ticketData = {
      fechaCompra: fecha,
      categoriaEspectador: categoria,
      precioTicket: precio,
      Espectador: id
    };
    let httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    }
    
    let body = JSON.stringify(ticketData)
    console.log(JSON.stringify(id) + ' idEspectador')
    console.log(JSON.stringify(ticketData) + '   Enviado  ')
    return this._http.put(this.urlBase+'/ticket/'+idTicket, body,httpOptions)
  }
  deleteTicket(data:any):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.delete(this.urlBase+'/ticket/'+data.toString(), httpOptions)
  }
}
