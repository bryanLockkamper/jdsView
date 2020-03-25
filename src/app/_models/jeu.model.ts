import { GenreModel } from './genre.model';

export interface JeuModel {

    id: number;
    titre: string;
    description: string;
    nbrJoueurMin: number;
    nbrJoueurMax: number;
    genres: GenreModel[];
    maisonEdition: string;
    ageMin: number;

}