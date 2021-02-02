import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancionServiceService } from '../../services/cancion-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  
  canciones:any[] = [];

  constructor(private cancionS: CancionServiceService) { }

  ngOnInit() {
  }

  buscarC(event){
    this.cancionS.buscarCancion(event.detail.value).subscribe(resp => {
      this.canciones = [];
      this.canciones.push(...resp['cancion']);
    })
  }

}
