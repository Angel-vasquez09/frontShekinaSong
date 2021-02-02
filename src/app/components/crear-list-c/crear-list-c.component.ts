import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CancionServiceService } from '../../services/cancion-service.service';
import { ListCancionesService } from '../../services/list-canciones.service';

@Component({
  selector: 'app-crear-list-c',
  templateUrl: './crear-list-c.component.html',
  styleUrls: ['./crear-list-c.component.scss'],
})
export class CrearListCComponent implements OnInit {

  canciones: any[] = [];
  cancionesSeleccionadas: any[] = [];
  guardarListaS: any[] = [];
  fecha: Date;
  botonActivo = false;

  constructor(
    public toastC: ToastController,
    public modalController: ModalController,
    private cancionS: CancionServiceService,
    private listCa: ListCancionesService,
    public alertController:AlertController
    ) { }

  ngOnInit() {
    this.cancionS.getCanciones(1).subscribe(resp => {
      this.canciones.push(...resp['cacniones']);
    })
  }

  buscarC(event){
    this.cancionS.buscarCancion(event.detail.value).subscribe(resp => {
      this.canciones = [];
      this.canciones.push(...resp['cancion']);
    })
  }

  guardarC(e,cancion){

    var isChecked = !e.currentTarget.checked;

    this.cancionesSeleccionadas = this.cancionesSeleccionadas.filter(result => result.cancion['_id'] !== cancion['_id'])
    
    const seleccionado = {
      cancion,
      isCheck: isChecked
    }
    

    this.cancionesSeleccionadas.push(seleccionado);
    
    
  }

  guardarList(fecha){
    if (fecha.value === undefined) {
      this.alertaError('Ingrese una fecha para su lista');
      return;
    }
    
    if (this.cancionesSeleccionadas.length === 0) {
      this.alertaError('Seleccione una o mas canciones a la lista');
      return;
    }

    // toLocaleDateString()
    // GUARDAR LA LISTA DE CANCIONES QUE SELECIONO EL USUARIO
    for (let index = 0; index < this.cancionesSeleccionadas.length; index++) {
      const element = this.cancionesSeleccionadas[index].isCheck;
      if (element) {
        this.guardarListaS.push(this.cancionesSeleccionadas[index].cancion);
      }
    }
  
    this.guardarListaS.forEach(cancion => {
      const cancionUpdate = {
        artista    : cancion.artista,
        nombre     : cancion.nombre,
        tipo       : cancion.tipo,
        letra      : cancion.letra,
        id         : cancion._id,
        ultimaFecha: new Date(),
      }
      this.cancionS.updateC(cancionUpdate);
    });
    // FUNCION QUE NOS GUARDA LA LISTA EN LA BASE DE DATOS
    this.guardarListCancion(fecha);
    
    // VACIAMOS LOS ARREGLOS POR SI QUIEREN AGREGAR MAS LISTA
    this.guardarListaS = [];
  }

// CREAMOS UNA COLECCION EN LA BASE DE DATOS CON LA LISTA
  guardarListCancion(fecha){
    const listCanciones = {
      canciones: this.guardarListaS,
      fechaCanto: new Date(fecha.value)
    }
    this.listCa.guardarListC(listCanciones).subscribe(resp => {
      if (resp['ok']) {
        this.dismiss();
        this.toast('Lista guardada con exito !!');
      }
    });
    
  }


// ALERTA PARA QUE GUARDE LAS CANCIONES EN LA LISTA
  async alertaError(mensaje) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: [
        {
          text:'OK',
        }
      ]
    });

    await alert.present();
  }

  // INFINITE SCROLL
  loadData(event) {
    setTimeout(() => {
      this.cancionS.getCanciones().subscribe(resp => {
        this.canciones.push(...resp['cacniones']);
        
        event.target.complete();

        if (resp['cacniones'].length === 0) {
          event.target.disabled = true;
        }
      })
      
    }, 500);
  }

  // MENSAJE TOAS DE LISTA GUARDADA CON EXITO
  async toast(mensaje){
    const toast = await this.toastC.create({
      message: mensaje,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
