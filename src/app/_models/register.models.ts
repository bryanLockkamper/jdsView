import { Adresse } from './adresse.model';

export interface RegisterModel {
    email: string;
    password: string;
    confirmpassword: string;
    pseudo: string;
    dateNaissance: Date;
  }