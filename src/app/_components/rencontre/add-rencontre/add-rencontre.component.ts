import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {$e} from "codelyzer/angular/styles/chars";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-rencontre',
  templateUrl: './add-rencontre.component.html',
  styleUrls: ['./add-rencontre.component.scss']
})
export class AddRencontreComponent implements OnInit{

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<AddRencontreComponent>,
    private toastrServ : NbToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      titre: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      heure: new FormControl(null, Validators.required),
      tempsDeJeu: new FormControl(null, Validators.required),
      nbrParticipantLimite: new FormControl(null, Validators.required),
      description: new FormControl(null),
      adresse: new FormGroup({
        rue: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        codePostal: new FormControl(null, Validators.required),
        ville: new FormControl(null, Validators.required)
      }),
      photo: new FormControl(null),
    });
  }

  close(b: boolean) {
    this.dialogRef.close(this.form);
  }

  recupPhoto(files: any) {
    console.log(files);
    this.getBase64(files[0]).subscribe(value =>
      this.form.get('photo').setValue(value)
    )
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
