import { Genre } from './Genre.model';

export interface Jeu {
    id:number;
    titre:string;
    description:string;
    nbrJoueurMin:number;
    nbrJoueurMax:number;
    genres:Genre[];
    maisonEdition:string;
    ageMin:number;
}
