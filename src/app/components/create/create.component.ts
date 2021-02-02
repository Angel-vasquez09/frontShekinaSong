import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Cancion } from 'src/app/models/cancion.model';
import { CancionServiceService } from 'src/app/services/cancion-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  public formGroup:FormGroup;
  public cancion:Cancion;
  public resultado:any;

  constructor(
    public modalController: ModalController,
    public Mtoast: ToastController,
    private router:Router,
    private formBuilder:FormBuilder,
    private cancionService:CancionServiceService,
    public alertController:AlertController) { }

  public tipoCancion:string[]=["Alabanza","Adoracion","Viejita"];

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre:[null,Validators.required],
      artista:[null,Validators.required],
      letra:[null,Validators.required],
      tipo:[null,Validators.required]
    })
  }

  get f(){
    return this.formGroup.controls;
  }

  goToBack(){
  this.router.navigateByUrl('/filtro/todas');
  }

  async saveCancion(){

    /* const artista = this.f.artista.value;
    const nombre = this.f.nombre.value;
    const letra = this.f.letra.value;
    const tipo = this.f.tipo.value; */

    //this.cancion=new Cancion(artista,nombre,letra,tipo);  
    const nuevaC = {
      artista: this.f.artista.value,
      nombre : this.f.nombre.value,
      letra  : this.f.letra.value,
      tipo   : this.f.tipo.value,
    }
    
    const creada = await this.cancionService.saveCanciones(nuevaC);

    if (creada) {
      this.resetFormulario();
      this.toast('Cancion creada con exito !!');
    }
    
  }

  // VACIAR FORMULARIO
  resetFormulario(){
    this.formGroup.reset({
      nombre  : '',
      artista : '',
      letra   : '',
      tipo    : ''
    })
  }

  // MENSAJE TOAST
  
  async toast(mensaje){
    const toast = await this.Mtoast.create({
      message: mensaje,
      duration: 2000
    })
    toast.present();
  }


  
}
