import { Component, OnInit } from '@angular/core';
import { Jeu } from 'src/app/_models/jeu.model';
import { FormGroup, FormControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { JeuService } from 'src/app/_services/jeu.service';
import { GenreService } from 'src/app/_services/genre.service';
import { Genre } from 'src/app/_models/Genre.model';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent implements OnInit {

  genreList: Genre[];
  models : Jeu[];
  j : Jeu;
  choix : number;
  currentJeu: Jeu;

  jeuForm : FormGroup;
  modifJeuForm: FormGroup;

  bol : Boolean;
  roles : string[];

  constructor(
    private jeuService : JeuService,
    private toastr: NbToastrService,
    private genreServ : GenreService,
    private userService : UtilisateurService,
    ) { }

  ngOnInit(): void {

    //Todo : voir les affichages qui doit voir quoi
    // this.roles = decode(localStorage.getItem('token')).roles;

    // this.roles.forEach(element => {
    //   if (element == 'Admin')
    //   return this.bol =true; 
    //   else 
    //   this.bol = false;
    // });
    
    this.choix = 1;

    this.jeuForm = new FormGroup({
    'titre': new FormControl(
      null,
    ),
    'description': new FormControl(
      null,
    ),
    'nbrJoueurMin': new FormControl(
      null,
    ),
    'nbrJoueurMax': new FormControl(
      null,
    ),
    'genres': new FormControl(
      null,
    ),
    'maisonEdition': new FormControl(
      null,
    ),
    'ageMin': new FormControl(
      null,
    ),
    });

    this.modifJeuForm = new FormGroup({
      'titre': new FormControl(
        null,
      ),
      'description': new FormControl(
        null,
      ),
      'nbrJoueurMin': new FormControl(
        null,
      ),
      'nbrJoueurMax': new FormControl(
        null,
      ),
      'genres': new FormControl(
        null,
      ),
      'maisonEdition': new FormControl(
        null,
      ),
      'ageMin': new FormControl(
        null,
      ),
      });

    this.genreList = [];
    this.genreServ.getAllGenre();
    this.genreServ.context$.subscribe(data => this.genreList = data);

    this.models = [];
    this.jeuService.getAllJeu();
    this.jeuService.context$.subscribe(data => this.models = data);
  }

  serv(item : Jeu) {
    this.choix = 2;
    this.currentJeu = item;
    this.modifJeuForm.get('titre').setValue(this.currentJeu.titre);
    this.modifJeuForm.get('description').setValue(this.currentJeu.description);
    this.modifJeuForm.get('nbrJoueurMin').setValue(this.currentJeu.nbrJoueurMin);
    this.modifJeuForm.get('nbrJoueurMax').setValue(this.currentJeu.nbrJoueurMax);
    this.modifJeuForm.get('genres').setValue(this.currentJeu.genres);
    this.modifJeuForm.get('maisonEdition').setValue(this.currentJeu.maisonEdition);
    this.modifJeuForm.get('ageMin').setValue(this.currentJeu.ageMin);
  }

  update() {
    this.currentJeu.titre = this.modifJeuForm.get('titre').value;
    this.currentJeu.description = this.modifJeuForm.get('description').value;
    this.currentJeu.nbrJoueurMin = this.modifJeuForm.get('nbrJoueurMin').value;
    this.currentJeu.nbrJoueurMax = this.modifJeuForm.get('nbrJoueurMax').value;
    this.currentJeu.genres = this.modifJeuForm.get('genres').value;
    this.currentJeu.maisonEdition = this.modifJeuForm.get('maisonEdition').value;
    this.currentJeu.ageMin = this.modifJeuForm.get('ageMin').value;
    this.jeuService.update(this.currentJeu)
    .subscribe(() => {
      this.toastr.success('Le jeu a été modifié');
    }, error => {
      console.log(error);
      this.toastr.danger('Une erreur est survenue');
    });
    this.choix = 1;
  }

  delete(toDelete : Jeu){
    this.jeuService.delete(toDelete)
      .subscribe(() => {
        this.toastr.success('Le jeu a été supprimé');
      }, error => {
        console.log(error);
        this.toastr.danger('Une erreur est survenue');
      });
  }

  add() {
    this.j = this.jeuForm.value;
    this.jeuService.insert(this.j)
      .subscribe(data => {
        this.toastr.success('Tout est Ok');
        //this.onAdd.emit(this.animalForm.value);
      }, error => {
        this.toastr.danger('Il y eu un problème');
      })
  }

}
