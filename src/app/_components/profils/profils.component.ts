import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { customValidators } from 'src/app/_shared/validators/custome-validators';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { Utilisateur } from 'src/app/_models/utilisateur.model';
import { Observable } from 'rxjs';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {

  formGroup: FormGroup;
  regex:RegExp;

  utilisateur:Utilisateur;

  constructor(
    private utilisateurservice:UtilisateurService
  ) { }

  ngOnInit(){

    this.utilisateurservice.getMonProfil(decode(localStorage.getItem('token')).userInfo.id).subscribe(x => {
      this.utilisateur = x;
      
      this.regex =(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      this.formGroup = new FormGroup({
        email : new FormControl('Exemple@test.com', Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(this.regex)
        ])),
        pseudo : new FormControl(this.utilisateur.pseudo,Validators.compose([
          Validators.min(3),
          Validators.max(10),
          Validators.required
        ])),
        dateNaissance : new FormControl(this.utilisateur.dateNaissance,Validators.compose([
          Validators.required
        ])),
        genre : new FormControl(this.utilisateur.genre,Validators.compose([

        ])),
        nom : new FormControl(this.utilisateur.nom,Validators.compose([

        ])),
        prenom : new FormControl(this.utilisateur.prenom,Validators.compose([

        ])),
        description : new FormControl(this.utilisateur.description,Validators.compose([

        ])),
        numero : new FormControl(this.utilisateur.numero,Validators.compose([

        ])),
        photo : new FormGroup({
          lien: new FormControl(null)
        }),
      },Validators.compose([
        customValidators.compare('password','confirm')
      ]));
    });
  }

  onSubmit(){
    console.warn()
    console.log('tutu')
    this.utilisateur.email = this.formGroup.value.email;
    this.utilisateur.pseudo = this.formGroup.value.pseudo;
    this.utilisateur.dateNaissance = this.formGroup.value.dateNaissance;
    this.utilisateur.genre = this.formGroup.value.genre;
    this.utilisateur.nom = this.formGroup.value.nom;
    this.utilisateur.prenom = this.formGroup.value.prenom;
    this.utilisateur.description = this.formGroup.value.description;
    this.utilisateur.numero = this.formGroup.value.numero;
    this.utilisateur.photo = this.formGroup.value.photo;
    this.utilisateurservice.getSaveMonProfil(this.utilisateur).subscribe();
  }

  recupPhoto(files: any) {
    this.getBase64(files[0]).subscribe(value => {
      this.formGroup.get('photo').get('lien').setValue(value)
    })

  }

  getBase64(file): Observable<string> {
    return new Observable<string>(sub => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sub.next(reader.result.toString());
        sub.complete();
      };
      reader.onerror = error => {
        sub.error(error);
      };
    })
  }

}
