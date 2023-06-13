import { Espectador } from "./espectador"

export class Ticket {
        idTicket:string
        id: string
        fechaCompra: string
        categoriaEspectador: string
        precioTicket: number
        Espectador: Espectador
        constructor(idTicket:string,id:string, fechaCompra:string, categoriaEspectador:string, precioTicket:number, Espectador: Espectador){
                this.idTicket = idTicket
                this.id = id
                this.fechaCompra = fechaCompra
                this.categoriaEspectador = categoriaEspectador
                this.precioTicket = precioTicket
                this.Espectador = Espectador
        }
}

