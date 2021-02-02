import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { LetraModalComponent } from './letra-modal/letra-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarCancionComponent } from './actualizar-cancion/actualizar-cancion.component';
import { ListCancionsComponent } from './list-cancions/list-cancions.component';
import { CrearListCComponent } from './crear-list-c/crear-list-c.component';
import { GetCancionesComponent } from './get-canciones/get-canciones.component';

@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    LetraModalComponent,
    ActualizarCancionComponent,
    ListCancionsComponent,
    CrearListCComponent,
    GetCancionesComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule
    
  ],
  exports:[
    CreateComponent,
    SearchComponent,
    LetraModalComponent,
    ActualizarCancionComponent,
    ListCancionsComponent,
    CrearListCComponent,
    GetCancionesComponent
  ]
  
})
export class ComponentsModule { }
