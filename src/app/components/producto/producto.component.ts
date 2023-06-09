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
          this.getDestacados()
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDestacados(){
    for(let i=0; i<this.productos.length;i++){
      if(this.productos[i].destacado == true){
        this.productosDestacados.push(this.productos[i])
      }
    }
  }
}
