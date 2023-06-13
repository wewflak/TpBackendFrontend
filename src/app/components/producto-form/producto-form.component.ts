import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  producto!:Producto;
  nombre!:string
  descripcion!:string
  stock!:number
  precio!:number
  imagen!:string
  destacado!:boolean
  imagenForm: FormGroup;
  imagenSeleccionada!:boolean
  constructor(private productoService: ProductoService) { 
    this.imagenForm = new FormGroup({
      imagenControl: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  onFileSelected(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagen = e.target.result;
        this.imagenSeleccionada = true
      };
      reader.readAsDataURL(file);
  }
  onDestacadoChange(event: any) {
    this.destacado = event.target.checked;
  }
  public createProduct(){
    this.producto = new Producto(
      this.nombre,
      this.descripcion,
      this.imagen,
      this.precio,
      this.stock,
      this.destacado
    )
    this.productoService.postProducto(this.producto).subscribe(
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
