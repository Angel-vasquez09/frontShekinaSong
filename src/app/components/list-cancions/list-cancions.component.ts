import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-cancions',
  templateUrl: './list-cancions.component.html',
  styleUrls: ['./list-cancions.component.scss'],
})
export class ListCancionsComponent implements OnInit {
  
  @Input() canciones: any[] = [];
  @Input() fecha:string;

  constructor(
    
    public modalController: ModalController) { }

  ngOnInit() {
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
