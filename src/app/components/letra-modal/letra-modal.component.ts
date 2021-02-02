import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-letra-modal',
  templateUrl: './letra-modal.component.html',
  styleUrls: ['./letra-modal.component.scss'],
})
export class LetraModalComponent implements OnInit {

  @Input() letra: string;
  @Input() nombre: string;
  @Input() id: string;
  

  // Desactivamos el slide
  slideOpts = {
    initialSlide: 0,
    allowTouchMove: false
  };

  constructor(public modalController: ModalController) { }

  ngOnInit() {
   
  }

  editarTitulo:boolean = false;
  editarTextA:boolean = false;

  dismiss(slide) {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}


