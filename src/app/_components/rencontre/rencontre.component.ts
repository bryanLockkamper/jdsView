import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbMenuItem} from "@nebular/theme";
import {AddRencontreComponent} from "./add-rencontre/add-rencontre.component";
import {Rencontre} from 'src/app/_models/rencontre.model';
import {NbToastrService} from '@nebular/theme';
import {RencontreService} from 'src/app/_services/rencontre.service';

@Component({
  selector: 'app-rencontre',
  templateUrl: './rencontre.component.html',
  styleUrls: ['./rencontre.component.scss']
})
export class RencontreComponent implements OnInit {

  models: Rencontre[];
  actualTab;

  constructor(
    private rencontreService: RencontreService,
    private toastr: NbToastrService,
    private dialog: NbDialogService
  ) {

  }

  ngOnInit(): void {
    this.models = [];
    this.rencontreService.getAllRencontre();
    this.rencontreService.context$.subscribe(data => this.models = data);
  }

  delete(toDelete: Rencontre) {
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
      if (value != 'cancel')
        this.rencontreService.create(value).subscribe(
          () => {
            this.toastr.success('La rencontre a été crée');
          }, error => {
            console.log(error);
            this.toastr.danger('Une erreur est survenue');
          })
    })
  }

  changeTab($event: any) {
    this.actualTab = $event.tabTitle
  }

  filter(item: Rencontre) {
    switch (this.actualTab) {
      case 'Je participe':
        for (let i = 0; i < item.utilisateurAffList.length; i++) {
          if (item.utilisateurAffList[i].id == Number(localStorage.getItem('id')))
            return true;
        }
        return false;
      case 'Je peux participer':
        if (new Date(item.date) > new Date()
          && item.utilisateurCrea.id != Number(localStorage.getItem('id'))
          && item.utilisateurAffList.length < item.nbrParticipantLimite) {
          if (item.utilisateurAffList.length > 0
            && item.utilisateurAffList.find(value => value.id != Number(localStorage.getItem('id')))) {
            return true;
          }
          else return item.utilisateurAffList.length == 0;
        }
        return false;
      case "J\'ai créer":
        return item.utilisateurCrea.id == Number(localStorage.getItem('id'));
    }
  }

  inscription(item: Rencontre) {
    item.utilisateurAffList.push({
      adresseList: [],
      dateNaissance: undefined,
      description: "",
      email: "",
      genre: "",
      jeuPreferes: [],
      nom: "",
      numero: "",
      photo: undefined,
      prenom: "",
      pseudo: "",
      rencontreAffList: [],
      rencontreCreaList: [],
      roles: [],
      id: Number(localStorage.getItem('id'))
    });
    this.rencontreService.modifier(item).subscribe(
      () => {
        this.toastr.success('Vous êtes inscrit');
      }, error => {
        console.log(error);
        this.toastr.danger('Une erreur est survenue');
      }
    );
  }

  desinscription(item: Rencontre) {
    item.utilisateurAffList = item.utilisateurAffList.filter(value => value.id != Number(localStorage.getItem('id')));
    this.rencontreService.modifier(item).subscribe(
      () => {
        this.toastr.success('Vous êtes désinscrit');
      }, error => {
        console.log(error);
        this.toastr.danger('Une erreur est survenue');
      }
    );
  }
}
