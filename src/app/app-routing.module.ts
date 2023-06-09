import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

const routes: Routes = [
  {path:'producto', component:ProductoComponent},
  {path:'producto-form', component:ProductoFormComponent},
  {path:'ticket', component:TicketComponent},
  {path:'ticket-form', component:TicketFormComponent}
    //   {path:'movieDetail', component:MovieDetailComponent, data:{'data':{}}}
    // ];
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }