import { AdresseRegister } from './adresseRegister';

export interface RegisterModel {
    email: string;
    password: string;
    confirmpassword: string;
    pseudo: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    genre: string;
    adresse: AdresseRegister;
    numero: string;
    rue: string;
    numeroAdresse: string;
    codePostal: number;
    ville: string;
  }