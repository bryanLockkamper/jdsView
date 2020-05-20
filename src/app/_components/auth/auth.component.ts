import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import {NbDateService, NbToastrService} from '@nebular/theme';
import { Router } from '@angular/router';
import { customValidators } from 'src/app/_shared/validators/custome-validators';
import { Utilisateur } from 'src/app/_models/utilisateur.model';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  isRegistered: number;
  user: Utilisateur;
  max;
  today;

  constructor(
    private authService: AuthService,
    private userService: UtilisateurService,
    private toastrService: NbToastrService,
    private router: Router,
    private dateService: NbDateService<Date>
  ) { }

  ngOnInit(): void {
    this.isRegistered = 0;
    this.max = this.dateService.addYear(this.dateService.today(), -18);
    this.today = this.dateService.addYear(this.dateService.today(), -18);
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
          Validators.max(30),
          Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")
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
          Validators.max(30),
          //regex : ^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$
          Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")
        ])
      ),
      'confirmpassword': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.max(30),
          customValidators.compare('password','confirm')
        ])
      ),
      'pseudo': new FormControl(
        null,
        Validators.required,

        ),
      'dateNaissance': new FormControl(
        null,
        Validators.required
      ),
      groupes: new FormControl()
    })
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(token => {
        localStorage.setItem("token", JSON.stringify(token['token']))
        this.toastrService.info('Connecté! Bienvenue sur notre site !!');
        //message de success
        //rediriger le user
        this.router.navigateByUrl('/home');
      }, error => {
        console.log(error);
        this.toastrService.danger('Login ou mdp incorrect!!')
        //message d'erreur
      });
  }

  register() {
    this.registerForm.get('groupes').setValue([{id : 1, nom :'ForeverAlone'}])
    this.authService.register(this.registerForm.value).subscribe(token => {
      localStorage.setItem('token', token);
      this.toastrService.info('Enregistré! Bienvenue sur notre site !!');
      //message de success
      //rediriger le user
      this.router.navigateByUrl('/home');
    }, error => {
      this.toastrService.danger(error.error.text)
      //message d'erreur
    });

  }

}
