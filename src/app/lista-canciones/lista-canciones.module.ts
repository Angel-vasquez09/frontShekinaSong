import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCancionesPageRoutingModule } from './lista-canciones-routing.module';

import { ListaCancionesPage } from './lista-canciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCancionesPageRoutingModule
  ],
  declarations: [ListaCancionesPage]
})
export class ListaCancionesPageModule {}
