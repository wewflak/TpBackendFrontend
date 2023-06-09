import { Espectador } from "./espectador"

export class Ticket {
        fechaCompra: string
        categoriaEspectador: string
        precioTicket: number
        Espectador: string
        constructor(fechaCompra:string, categoriaEspectador:string, precioTicket:number, idEspectador: string){
                this.fechaCompra = fechaCompra
                this.categoriaEspectador = categoriaEspectador
                this.precioTicket = precioTicket
                this.Espectador = idEspectador
        }
}

