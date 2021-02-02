import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CancionServiceService } from '../../services/cancion-service.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-actualizar-cancion',
  templateUrl: './actualizar-cancion.component.html',
  styleUrls: ['./actualizar-cancion.component.scss'],
})
export class ActualizarCancionComponent implements OnInit {
  
  @Input()cancion: any = {};
  
  public formGroup: FormGroup;

  public tipoCancion:string[]=["Alabanza","Adoracion","Viejita"];

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private formBuilder:FormBuilder,
    private cancionS: CancionServiceService) { }

  ngOnInit() {
    console.log(this.cancion.tipo);
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre :[this.cancion.nombre,Validators.required],
      artista:[this.cancion.artista,Validators.required],
      letra  :[this.cancion.letra,Validators.required],
      tipo   :[this.cancion.tipo,Validators.required]
    })
  }

  // ACTUALIZAR
  async actualizar(){
    if (!this.formGroup.invalid) {

      const cancionN = {
        id     : this.cancion._id, 
        nombre : this.formGroup.value.nombre,
        artista: this.formGroup.value.artista,
        letra  : this.formGroup.value.letra,
        tipo   : this.formGroup.value.tipo,
      }
      
      const actualizado = await this.cancionS.updateC(cancionN);
      
      if (actualizado) {
        this.presentToast('Datos Actualizados Correctamente');
        this.dismiss();
      }

    }else{
      this.presentToast('Verificar todos los campos')
    }
  }

  // TOAST DE DATOS ACTUALIZADOS CORRECTAMENTE
  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


  // CERRAR MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
