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
    return this._http.get(this.urlBase+'/espectador/'+id, httpOptions)
  }
  getTicketsCategoria(tipo:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/ticket/categoria/'+tipo, httpOptions)
  }
  createTicket(ticket:Ticket):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    }
    
    let body = JSON.stringify(ticket)
    return this._http.post(this.urlBase+'/ticket/', body,httpOptions)
  }
  deleteTicket(data:any):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/ticket/categoria/'+data.toString(), httpOptions)
  }
}
