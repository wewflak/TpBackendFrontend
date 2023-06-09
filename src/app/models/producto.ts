export class Producto {
    nombre!: string;
    descripcion!: string;
    imagen!: string;
    precio!: number;
    stock!: number;
    destacado!: boolean;

    constructor(nombre: string,descripcion: string,imagen: string,precio: number,stock: number,destacado: boolean) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.destacado = destacado;
    }
}
