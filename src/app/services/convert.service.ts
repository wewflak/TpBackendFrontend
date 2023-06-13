import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  urlBase:string="http://localhost:3000/api"
  constructor(private _http: HttpClient) { }
  addOperation(monedaOrigen:string, monedaDestino:string, emailCliente:string, cantidadDestino:number, cantidadOrigen:number, tasaConversion:number):Observable<any>{
    const operationData={
      monedaOrigen:monedaOrigen,
      cantidadOrigen:cantidadOrigen,
      monedaDestino:monedaDestino,
      cantidadDestino:cantidadDestino,
      tasaConversion:tasaConversion,
      emailCliente:emailCliente
    }
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
        // monedaOrigen: {type: String, required: true},
    // cantidadOrigen: {type:Number, required: true},
    // monedaDestino: {type:String, required:true},
    // cantidadDestino: {type:Number, required:true},
    // tasaConversion: {type:Number, required:true},
    // emailCliente: {type: String, required: true}
    let body = JSON.stringify(operationData)
    console.log(JSON.stringify(operationData) + ' service')
    return this._http.post(this.urlBase+'/transaccion/', body,httpOptions)
  }
  getOperations(): Observable<any> {
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/transaccion/', httpOptions)
  }
  getOperationsCurrencies(from:string, to:string): Observable<any> {
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/transaccion/'+from+'/'+to, httpOptions)
  }  
  private readonly apiKey: string = 'b7fc317da07f5bdd4b62bc3d';
  private readonly baseUrl2: string = 'https://v6.exchangeratesapi.io'
  public getExchangeRate(baseCurrency: string, targetCurrency: string, amount:number): Observable<any> {
      let httpOptions={
        params:{
        'baseCurrency': baseCurrency,
        'targetCurrency': targetCurrency
        },
        headers: new HttpHeaders({
          'apiKey':'b7fc317da07f5bdd4b62bc3d'
        })
      }

  
      return this._http.get('https://v6.exchangerate-api.com/v6/'+this.apiKey+'/pair/'+baseCurrency+'/'+targetCurrency)
    }
  getOperationsEmail(email:string): Observable<any> {
    let httpOptions={
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase+'/transaccion/email/'+email, httpOptions)
  }
}
