import { Adresse } from './adresse.model';
import { Photo } from './photo.model';
import { Jeu } from './jeu.model';
import { Utilisateur } from './utilisateur.model';

export interface Rencontre {
    id:number;
    titre:string;
    date:Date;
    tempDeJeu:number;
    nbrParticipantLimite:number;
    adresse:Adresse;
    description:string;
    photo:Photo;
    jeuList:Jeu[];
    utilisateurCrea:Utilisateur;
}