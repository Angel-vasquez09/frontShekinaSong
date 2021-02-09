import { EventEmitter, Injectable } from '@angular/core';
import { Cancion } from '../models/cancion.model';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const urlBackend = "http://localhost:3000/";
@Injectable({
  providedIn: 'root'
})
export class CancionServiceService {

  private urlBackend = "https://shekinasongs.herokuapp.com/canciones";
  //private urlBackend = "http://localhost:3000/canciones";

  public Canciones:Cancion[];

  nuevaCancion = new EventEmitter<any>();
  
  pagina = 0;
  
  constructor(private httpClient: HttpClient) { }

  public getCancionesFiltro(filtro:string,valor:string):Observable<any>{
    const url = `${this.urlBackend}/obtener/${filtro}/${valor}`;   
    console.log(url);
    return this.httpClient.get(url);
  }


  // BUSCAR CACNION 
  public buscarCancion(cancion:string){
    return this.httpClient.get(`${ this.urlBackend }/buscar/?texto=${ cancion }`);
  }

  // OBTENER CANCIONES PAGINADAS
  public getCanciones(pagina?):Observable<any>{
    if (pagina) {
      this.pagina = pagina;
    }else{
      this.pagina++;
    }
    
    const url = `${this.urlBackend}/?pagina=${ this.pagina }`;

    return this.httpClient.get(url);

  }

  // GUARDAR CANCION
  saveCanciones(cancion:any){
    /* const url = `${this.urlBackend}/crear`;
    const json = JSON.stringify(cancion);
    
    const body = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    
    return this.httpClient.post(url,body,{headers: headers}).subscribe(resp => {
      this.nuevaCancion.emit(resp['cacion']);
    }) */

    return new Promise(resolve => {
      this.httpClient.post(`${ this.urlBackend }/crear`,cancion)
        .subscribe(resp => {
          if (resp['ok']) {
            this.nuevaCancion.emit(resp['cacion']);
            resolve(true);
          }
        });
    })
      
      
     
  }

  // ELIMINAR CANCION DE LA BASE DE DATOS
  eliminar(id:string){
    const user = {id: id};
    return this.httpClient.post(`${ this.urlBackend }/delete`,user);
  }

  // ACTUALIZAR CANCION
  updateC(cancion:any){

    return new Promise(resolve => {
      this.httpClient.post(`${ this.urlBackend }/update`,cancion).subscribe(resp =>{
        if (resp['ok']) {
          resolve(true);
        }
      });
    }) 
    

  }
}
