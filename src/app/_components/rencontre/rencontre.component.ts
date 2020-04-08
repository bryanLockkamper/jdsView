import { Component, OnInit } from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {AddRencontreComponent} from "./add-rencontre/add-rencontre.component";

@Component({
  selector: 'app-rencontre',
  templateUrl: './rencontre.component.html',
  styleUrls: ['./rencontre.component.scss']
})
export class RencontreComponent implements OnInit {

  constructor(
    private dialog: NbDialogService
  ) { }

  ngOnInit(): void {
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
