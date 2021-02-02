export class Cancion {
    
    artista: string;
    created: Date;
    nombre: string;
    letra: string;
    tipo:string;


    constructor(artista:string,nombre:string,letra:string,tipo:string) {
        this.artista=artista;
        this.nombre=nombre;
        this.letra=letra;
        this.tipo=tipo;
    }
}