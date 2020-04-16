import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: NbMenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      { title: 'Home', icon: 'home', link: '/home' },
      { title: 'Mon profil', icon: 'home', link: '/profils' },

      { title: 'Jeux', icon: 'save', link: '/jeu' },
      { title: 'Rencontres', icon: 'people', link: '/rencontre' },
      { title: 'Genres', icon: 'folder', link: '/genre' },

    ]
  }

}
