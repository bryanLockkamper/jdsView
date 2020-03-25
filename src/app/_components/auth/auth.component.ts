import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup
  registerForm: FormGroup

  isRegistered: number

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isRegistered = 0;

    this.loginForm = new FormGroup({
      'email': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.max(255)
        ]) 
      ),
      'password': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.max(255)
        ])
      )
    });

    this.registerForm = new FormGroup({
      'email': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.max(255)
        ]) 
      ),
      'password': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.max(255)
        ])
      ),
      'confirmpassword': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.max(255),
        ])
      ),
      'pseudo': new FormControl( 
        null,
        Validators.required
        ),

      'nom': new FormControl(
        null,
        Validators.required
      ),
    
      'prenom': new FormControl(
        null,
        Validators.required
      ),
      'dateNaissance': new FormControl(
        null,
        Validators.required
      ),
      'genre': new FormControl(
        null,
        Validators.required
      ),
      'adresse': new FormControl(
        null,
        Validators.required
      ),
      'numero': new FormControl(
        null,
        Validators.required
      ),
    })
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(token => {
        //====> Todo: gestion Token
        localStorage.setItem('TOKEN', token);
        this.toastrService.info('Bienvenue sur notre site !!')
        //message de success
        //rediriger le user
        this.router.navigateByUrl('/default/home');
      }, error => {
        console.log(error);
        this.toastrService.danger('Login ou mdp incorrect!!')
        //message d'erreur
      });
  }

  register() {    
    this.authService.register(this.registerForm.value).subscribe();

  }

}