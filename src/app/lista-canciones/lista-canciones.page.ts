import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ListCancionsComponent } from '../components/list-cancions/list-cancions.component';
import { CrearListCComponent } from '../components/crear-list-c/crear-list-c.component';
import { ListCancionesService } from '../services/list-canciones.service';

@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.page.html',
  styleUrls: ['./lista-canciones.page.scss'],
})
export class ListaCancionesPage implements OnInit {

  cancionesFecha: any[] = [];

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public alertController:AlertController,
    private listC: ListCancionesService) { }

  ngOnInit() {
    this.getLista();
  }

  getLista(){
    this.listC.getListaCaciones().subscribe(resp => {
      this.cancionesFecha = [];
      this.cancionesFecha.push(...resp['cacniones']);
    },
    err =>{
      this.presentError(err.message);
    })
  }

  async verList(lista) {
    const modal = await this.modalController.create({
      component: ListCancionsComponent ,
      cssClass: 'my-custom-class',
      componentProps: {
        'canciones': lista
      }

    });
    return await modal.present();
  }

  async crearList(){
    const modal = await this.modalController.create({
      component: CrearListCComponent ,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  // ELIMINAR LISTA DE LA BASE DE DATOS
  async eliminarLista(id){
    const eliminado = await this.listC.deleteList(id);
    if (eliminado) {
      this.getLista();
      this.Eliminado('Lista Eliminada Con Exito')
    }
  }

  // REFRESCAR PANTALLA
  refrescar(){
    this.getLista();
  }

  async Eliminado(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentError(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
