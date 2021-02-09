import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { CancionServiceService } from 'src/app/services/cancion-service.service';
import { ActualizarCancionComponent } from '../actualizar-cancion/actualizar-cancion.component';
import { LetraModalComponent } from '../letra-modal/letra-modal.component';

@Component({
  selector: 'app-get-canciones',
  templateUrl: './get-canciones.component.html',
  styleUrls: ['./get-canciones.component.scss'],
})
export class GetCancionesComponent implements OnInit {

  @Input() canciones: any[] = [];

  constructor(
    public toast: ToastController,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    public modalController: ModalController,
    public cancionService: CancionServiceService,
    public alertController:AlertController) {}

  ngOnInit() {}

  // OBTENER TODAS LAS CANCIONES
  getCacniones(pagina?){
    var get = this.cancionService.getCanciones();
    
    if (pagina) {
      get = this.cancionService.getCanciones(pagina);
    }

    get.subscribe(data=>{
      this.canciones=data.cacniones;
    })

  }



  // Opciones para eliminar o culaquier cosa
  async opciones(cancion:any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.cancionService.eliminar(cancion._id).subscribe(resp => {
            if(resp['ok']){
              this.getCacniones();
              this.Mtoast('Cancion Eliminada Con Exito')
            }
          });
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.ActuializarC(cancion);
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  // MENSAJES TOAST
  async Mtoast(mensaje){
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000
    })
    toast.present();
  }

  // MODAL PARA ACTUALIZAR CANCION
  async ActuializarC(cancion:any) {
    const moda = await this.modalController.create({
      component: ActualizarCancionComponent,
      componentProps: {
        'cancion': cancion
      }
    });
    return await moda.present();
  }


  async mostrarLetra(cancion:any) {
    const modal = await this.modalController.create({
      component: LetraModalComponent,
      componentProps: {
        'letra' : cancion.letra,
        'nombre': cancion.nombre,
        'id'    : cancion._id,
        'artista': cancion.artista,
        'tipo':cancion.tipo
      }
    });
    return await modal.present();
  }

}
