import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ListCancionesService {

  private urlBackend = "http://localhost:3000/listC";
  
  constructor(private httpClient: HttpClient) { }

  getListaCaciones(){
    return this.httpClient.get(`${this.urlBackend}`);
  }

  guardarListC(lista){
    return this.httpClient.post(`${ this.urlBackend }/`,lista);
  }

  // ELIMINAR LISTA DE CANCIONES
  deleteList(id){

    return new Promise(resolve => {
      this.httpClient.post(`${ this.urlBackend }/delete/?id=${ id }`,null)
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        }
      });

    }) 
  }


}
