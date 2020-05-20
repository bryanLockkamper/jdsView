import { Jeu } from './jeu.model';
import { Adresse } from './adresse.model';
import { Photo } from './photo.model';
import { Rencontre } from './rencontre.model';
import { Role } from './role.model';

export interface Groupe {
  id:number;
  nom:string;
}

export interface Utilisateur {
    id:number;
    pseudo:string;
    email:string;
    dateNaissance:Date;
    genre:string;
    jeuPreferes:Jeu[];
    nom:string;
    prenom:string;
    description:string;
    numero:string;
    adresseList:Adresse[];
    photo:Photo;
    rencontreAffList:Rencontre[];
    rencontreCreaList:Rencontre[];
    roles:Role[];
    groupes:Groupe[];
}
