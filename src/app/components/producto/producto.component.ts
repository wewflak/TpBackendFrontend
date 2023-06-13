import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos:Array<Producto>
  productosDestacados:Array<Producto>
  constructor(private productoService: ProductoService) { 
    this.productos = new Array<Producto>()
    this.productosDestacados = new Array<Producto>()
  }

  ngOnInit(): void {
    this.getDestacados()
  }
  prueba(){
    this.productoService.getProductos().subscribe(
        result=>{
          console.log(result)
          console.log(result[0].nombre + ' aaaaaaaaaaaaaaa')
          for(let i=0;i<result.length;i++){
            var nuevo = new Producto(
              result[i].nombre,
              result[i].descripcion,
              result[i].imagen,
              result[i].precio,
              result[i].stock,
              result[i].destacado
            )
            this.productos.push(nuevo)
          }
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDestacados(){
    this.productoService.getProductosDestacados().subscribe(
      result=>{
        for(let i=0;i<result.length;i++){
          var nuevo = new Producto(
            result[i].nombre,
            result[i].descripcion,
            result[i].imagen,
            result[i].precio,
            result[i].stock,
            result[i].destacado
          )
          this.productosDestacados.push(nuevo)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
}
