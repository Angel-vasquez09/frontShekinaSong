//import { Component, OnInit } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CancionServiceService } from '../services/cancion-service.service';
import { ModalController } from '@ionic/angular';import { OverlayBaseController } from '@ionic/angular/util/overlay';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  
  public folder: string;
  public canciones:any[] = [];
  public loading:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    public cancionService: CancionServiceService,
    public alertController:AlertController) {

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
   }

  ngOnInit() {

    this.cancionService.nuevaCancion.subscribe(resp => {
      this.canciones.unshift(resp);
    })

    if(this.folder==='todas'){
      this.loading=true;
         this.getCacniones(1);
    }

  }

  


  // REFRESCAR PANTALLA  
  Refresh(event) {
    this.getCacniones(1);
    event.target.complete();
  }


  // INFINITE SCROLL
  loadData(event) {
    setTimeout(() => {
      this.cancionService.getCanciones().subscribe(resp => {
        this.canciones.push(...resp['cacniones']);
        
        event.target.complete();

        if (resp['cacniones'].length === 0) {
          event.target.disabled = true;
        }
      })
      
    }, 500);
  }




  // OBTENER TODAS LAS CANCIONES
  getCacniones(pagina?){
    var get = this.cancionService.getCanciones();
    
    if (pagina) {
      get = this.cancionService.getCanciones(pagina);
    }

    get.subscribe(data=>{
      this.canciones=data.cacniones;
      this.loading=false;
    },
    error=>{
      this.alertaError('error 2'+error);
      this.loading=false;
    });  
  }



  

  // BUSCAR CACNIONES POR NOMBRE-TIPO-ARTISTA
  buscarC(event){
    console.log(event.detail.value);
    this.cancionService.buscarCancion(event.detail.value).subscribe(resp => {
      this.canciones = [];
      this.canciones.push(...resp['cancion']);
    })

  }





  goToSearch(folder:string){
    this.router.navigateByUrl(`search/${folder}`);
  }

  goToCreate(){
    this.router.navigateByUrl('/create');
  }





  

  
  async alertaError(mensaje) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: [
        {
          text:'OK',
        }
      ]
    });

    await alert.present();
  }

}
