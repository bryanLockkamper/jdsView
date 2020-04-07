import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/_models/genre.model';
import { GenreService } from 'src/app/_services/genre.service';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  models : Genre[]
  g : Genre;
  choix : number;
  currentGenre: Genre;

  genreForm : FormGroup
  modifgenreForm: FormGroup

  constructor(
    private genreService : GenreService,
    private toastr: NbToastrService,

  ) { }

  ngOnInit(): void {
    this.choix = 1;
    this.genreForm = new FormGroup({
    'titre': new FormControl(
      null,
    ),
    'description': new FormControl(
      null,
    ),
    });

    this.modifgenreForm = new FormGroup({
      'titre': new FormControl(
        null,
      ),
      'description': new FormControl(
        null,
      ),
      })
    
    this.models = [];
    this.genreService.getAllGenre();
    this.genreService.context$.subscribe(data => this.models = data);
  }
  
  serv(item : Genre) {    
    this.choix = 2;
    this.currentGenre = item;
    this.modifgenreForm.get('titre').setValue(this.currentGenre.titre);
    this.modifgenreForm.get('description').setValue(this.currentGenre.description);
  }

  update() {
    this.currentGenre.titre = this.modifgenreForm.get('titre').value;
    this.currentGenre.description = this.modifgenreForm.get('description').value;
    this.genreService.update(this.currentGenre)
    .subscribe(() => {
      this.toastr.success('Le genre a été modifié');
    }, error => {
      console.log(error);
      this.toastr.danger('Une erreur est survenue');
    });
    this.choix = 1;
  }

  delete(toDelete : Genre){    
    this.genreService.delete(toDelete)
      .subscribe(() => {
        this.toastr.success('Le genre a été supprimé');
      }, error => {
        console.log(error);
        this.toastr.danger('Une erreur est survenue');
      });
  } 

  add() {
    this.g = this.genreForm.value
    this.genreService.insert(this.g)
      .subscribe(data => {
        this.toastr.success('Tout est Ok');
        //this.onAdd.emit(this.animalForm.value);
      }, error => {
        this.toastr.danger('Il y eu un problème');
      })
  }

}
