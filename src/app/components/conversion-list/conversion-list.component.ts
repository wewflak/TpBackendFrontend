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
  transacciones!:Array<Transaccion>
  constructor(private convertService:ConvertService, private router: Router) {
    this.transacciones = new Array<Transaccion>()

  }
  
  ngOnInit(): void {
    this.getTransacciones()
  }
  getTransacciones(){
    this.convertService.getOperations().subscribe(
      result=>{
        console.log(result)
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
