import {Component, OnInit} from '@angular/core';
import {NbDateService, NbDialogRef, NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {$e} from "codelyzer/angular/styles/chars";
import {Observable} from "rxjs";
import {Jeu} from "../../../_models/jeu.model";
import {JeuService} from "../../../_services/jeu.service";
import {Groupe} from "../../../_models/utilisateur.model";
import {GroupeService} from "../../../_services/groupe.service";

@Component({
  selector: 'app-add-rencontre',
  templateUrl: './add-rencontre.component.html',
  styleUrls: ['./add-rencontre.component.scss']
})
export class AddRencontreComponent implements OnInit {

  form: FormGroup;
  jeuList: Jeu[];
  min: Date;
  groupes: Groupe[];

  constructor(
    protected dialogRef: NbDialogRef<AddRencontreComponent>,
    private jeuService: JeuService,
    private groupeService: GroupeService,
    private dateService: NbDateService<Date>
  ) {
  }

  ngOnInit(): void {
    this.min = this.dateService.today();
    this.jeuList = [];
    this.jeuService.getAllJeu();
    this.jeuService.context$.subscribe(data => this.jeuList = data);
    this.groupes = [];
    this.groupeService.getAllGroupe();
    this.groupeService.context$.subscribe(data => {
      this.groupes = data
      console.log(this.groupes)
    });
    this.form = new FormGroup({
      titre: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      tempsDeJeu: new FormControl(null, Validators.required),
      nbrParticipantLimite: new FormControl(null, Validators.required),
      description: new FormControl(null),
      adresse: new FormGroup({
        rue: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        codePostal: new FormControl(null, Validators.required),
        ville: new FormControl(null, Validators.required)
      }),
      photo: new FormGroup({
        lien: new FormControl(null)
      }),
      jeuList: new FormControl(null, Validators.required),
      groupeCrea: new FormControl()
    });
  }

  close(b: boolean) {
    if (b) {
      this.form.get('date').setValue(this.form.get('date').value.getFullYear()
        + '-'
        + ((this.form.get('date').value.getMonth()+1 < 10) ? ('0' + (this.form.get('date').value.getMonth()+1)) : (this.form.get('date').value.getMonth()+1))
        + '-'
        + this.form.get('date').value.getDate()
        + 'T'
        + this.form.get('time').value + ':00');
      console.log(this.form.value)
      this.dialogRef.close(this.form.value)
    } else this.dialogRef.close('cancel');
  }

  recupPhoto(files: any) {
    this.getBase64(files[0]).subscribe(value =>
      this.form.get('photo').get('lien').setValue(value)
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
