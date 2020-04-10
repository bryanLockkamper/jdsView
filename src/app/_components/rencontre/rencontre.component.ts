import { Component, OnInit } from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {AddRencontreComponent} from "./add-rencontre/add-rencontre.component";
import { Rencontre } from 'src/app/_models/rencontre.model';
import { NbToastrService } from '@nebular/theme';
import { RencontreService } from 'src/app/_services/rencontre.service';

@Component({
  selector: 'app-rencontre',
  templateUrl: './rencontre.component.html',
  styleUrls: ['./rencontre.component.scss']
})
export class RencontreComponent implements OnInit {

  models : Rencontre[];

  constructor(
    private rencontreService : RencontreService,
    private toastr: NbToastrService,
    private dialog: NbDialogService
  ) {

  }

  ngOnInit(): void {
    this.models = [];
    this.rencontreService.getAllRencontre();
    this.rencontreService.context$.subscribe(data => this.models = data);
  }

  delete(toDelete : Rencontre){
    this.rencontreService.delete(toDelete)
      .subscribe(() => {
        this.toastr.success('La rencontre a été supprimé');
      }, error => {
        console.log(error);
        this.toastr.danger('Une erreur est survenue');
      });
  }

  addRencontre() {
    this.dialog.open(AddRencontreComponent, {
      closeOnBackdropClick: false,
      closeOnEsc: true,
      context: undefined
      }).onClose.subscribe(value => {
        //todo appeler le service pour enregistrer dans l'api
    })
  }
}
