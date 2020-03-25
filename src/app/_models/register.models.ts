import { Adresse } from './adresse';

export interface RegisterModel {
    email: string;
    password: string;
    confirmpassword: string;
    pseudo: string;
    dateNaissance: Date;
  }