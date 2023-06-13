import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-conversion-list',
  templateUrl: './conversion-list.component.html',
  styleUrls: ['./conversion-list.component.css']
})
export class ConversionListComponent implements OnInit {
  transaccion!:Transaccion
  divisas!:Array<string>
  divisaOrigen!:string
  divisaDestino!:string
  transacciones!:Array<Transaccion>
  emailSearched!:string
  constructor(private convertService:ConvertService, private router: Router) {
    this.transacciones = new Array<Transaccion>()
    this.divisas = new Array<string>()
    this.divisas=[
      "ARS","USD","EUR"
    ]
  }
  
  ngOnInit(): void {
    this.getTransacciones()
  }
  getTransacciones(){
    this.convertService.getOperations().subscribe(
      result=>{
        console.log(result)
        this.cleanArray()
        result.forEach((element:any) => {
          let unaTransaccion:Transaccion = new Transaccion()
          Object.assign(unaTransaccion, element)
          this.transacciones.push(unaTransaccion)
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
  public cleanArray(){
    while(this.transacciones.length>0){
      this.transacciones.pop();
    }
  }
  getTransaccionesDivisas(){
    this.convertService.getOperationsCurrencies(this.divisaOrigen, this.divisaDestino).subscribe(
      result=>{
        console.log(result)
        this.cleanArray()
        result.forEach((element:any) => {
          let unaTransaccion:Transaccion = new Transaccion()
          Object.assign(unaTransaccion, element)
          this.transacciones.push(unaTransaccion)
        });
        
      },
      error=>{
        console.log(error)
      }
    )
  }  
  getTransaccionesEmail(){
    this.convertService.getOperationsEmail(this.emailSearched).subscribe(
      result=>{
        console.log(result)
        this.cleanArray()
        result.forEach((element:any) => {
          let unaTransaccion:Transaccion = new Transaccion()
          Object.assign(unaTransaccion, element)
          this.transacciones.push(unaTransaccion)
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
}
