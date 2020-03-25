import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: NbMenuItem[];
<<<<<<< HEAD
  
  constructor() { }

  ngOnInit(): void {

    this.items = [
      { title: 'Home', icon: 'home', link: '/home' },
      
=======

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { title: 'Home', icon: 'home', link: '/home' },
     
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88
    ]
  }

}
