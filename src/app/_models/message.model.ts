import { Utilisateur } from './utilisateur.model';

export interface Message {
    sender: string;
    content: string;
    date: Date;
    reply: Boolean;
    type: string;
    // files?:File;
    user:Utilisateur;
}