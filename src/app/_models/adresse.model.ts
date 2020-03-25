import { Photo } from './photo.model';

export interface Adresse {
     id:number;
     rue:string;
     numero:string;
     codePostal:number;
     ville:string;
     photos:Photo[];
}


