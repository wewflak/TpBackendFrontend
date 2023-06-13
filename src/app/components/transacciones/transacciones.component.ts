import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Transaccion } from 'src/app/models/transaccion';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  divisas!:Array<string>
  divisaOrigen!:string
  cantOrigen!:number
  cantDestino!:number
  tasa!:number
  email!:string
  divisaDestino!:string
  constructor(private convertService: ConvertService, private router:Router) {   
    
    this.divisas = new Array<string>()
    this.divisas=[
      "ARS","USD","EUR"
    ]
  }

  ngOnInit(): void {
    this.cantOrigen=0
    this.cantDestino=0
    this.email=""
  }
  getTasaConversion(): Observable<number> {
    return this.convertService.getExchangeRate(this.divisaOrigen, this.divisaDestino, 1).pipe(
      map(result => {
        console.log(result);
        console.log(JSON.stringify(result) + ' STRING');
        this.tasa = result.conversion_rate;
        console.log('es: ' + this.tasa + ' should be ' + result.conversion_rate);
        return result.conversion_rate;
      }),
      catchError(error => {
        console.log(error);
        return of(0);
      })
    );
  }
  doConvert() {
    this.getTasaConversion().subscribe(
      tasa => {
        console.log('Tasa de conversión obtenida: ' + tasa);
        this.tasa = tasa;
        console.log(this.tasa + ' operacion');
        this.cantDestino = this.cantOrigen * this.tasa;
    
    this.createTransaction();
      },
      error => {
        console.error(error);
      }
    );
  }
  createTransaction(){
    var nuevo: Transaccion= {
      monedaOrigen: this.divisaOrigen,
      cantidadOrigen: this.cantOrigen,
      monedaDestino: this.divisaDestino,
      cantidadDestino: this.cantDestino,
      tasaConversion: this.tasa,
      emailCliente: this.email
    };
    console.log(this.tasa + ' tasaaaa')
    console.log(JSON.stringify(nuevo) + '  COmponente')
    this.convertService.addOperation(nuevo.monedaOrigen, nuevo.monedaDestino, nuevo.emailCliente, nuevo.cantidadDestino, nuevo.cantidadOrigen, nuevo.tasaConversion).subscribe(
      result=>{
        alert(result.msg)
        console.log(result)
        this.router.navigate(['transaccion-list'])
      },
      error=>{
        alert(error.msg)
        console.log(error)
      }
    )
  }
  getTransacciones(){
    this.convertService.getOperations().subscribe(
      result=>{
        console.log(result)
      },
      error=>{
        console.log(error)
      }
    )
  }
  getTransaccionesDivisas(){
    this.convertService.getOperationsCurrencies("USD","ARS").subscribe(
      result=>{
        console.log(result)
      },
      error=>{
        console.log(error)
      }
    )
  }  
  getTransaccionesEmail(){
    this.convertService.getOperationsEmail("ejemplo@gmail.com").subscribe(
      result=>{
        console.log(result)
      },
      error=>{
        console.log(error)
      }
    )
  }
}
