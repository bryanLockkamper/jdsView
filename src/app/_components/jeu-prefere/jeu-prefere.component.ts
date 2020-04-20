import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/_models/Genre.model';
import { Jeu } from 'src/app/_models/jeu.model';
import { FormGroup, FormControl } from '@angular/forms';
import { JeuService } from 'src/app/_services/jeu.service';
import { NbToastrService } from '@nebular/theme';
import { GenreService } from 'src/app/_services/genre.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { Utilisateur } from 'src/app/_models/utilisateur.model';

@Component({
  selector: 'app-jeu-prefere',
  templateUrl: './jeu-prefere.component.html',
  styleUrls: ['./jeu-prefere.component.scss']
})
export class JeuPrefereComponent implements OnInit {

  genreList: Genre[];
  models : Jeu[];
  j : Jeu;
  choix : number;
  currentJeu: Jeu;

  jeuForm : FormGroup;
  modifJeuForm: FormGroup;

  utilisateur:Utilisateur;

  constructor(
    private jeuService : JeuService,
    private toastr: NbToastrService,
    private genreServ : GenreService,
    private utilisateurservice:UtilisateurService
  ) { }

  ngOnInit(): void {
    
    this.genreList = [];
    this.genreServ.getAllGenre();
    this.genreServ.context$.subscribe(data => this.genreList = data);

    this.models = [];
    this.jeuService.getAllJeu();
    this.jeuService.context$.subscribe(data => this.models = data);

    this.utilisateurservice.getMonProfil(1).subscribe(x => {
      this.utilisateur = x
      console.log(this.utilisateur)
    })
  }

  add(toadd : Jeu){
    if(!this.utilisateur.jeuPreferes.includes(toadd)){
      this.utilisateur.jeuPreferes.push(toadd)
    }else{
      alert("Déja dans la liste")
    }
  }
  supp(tosup : Jeu){
    this.utilisateur.jeuPreferes = this.utilisateur.jeuPreferes.filter( x => x != tosup)
  }

  save(utilisateur : Utilisateur){
    this.utilisateurservice.getSaveMonProfil(utilisateur).subscribe(() => {
      this.toastr.success('La liste de jeu a été sauvegardé');
    }, error => {
      console.log(error);
      this.toastr.danger('Une erreur est survenue');
    });
    console.log(this.utilisateur.jeuPreferes)
  }

}
