import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCancionesPage } from './lista-canciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCancionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCancionesPageRoutingModule {}
