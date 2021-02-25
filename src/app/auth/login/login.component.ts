import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // google sing in
  auth2: any;

  formSubmitted = false;
  loginForm = this.formBuilder.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.renderButton();
  }
  login(): void {
    this.usuarioService.login(this.loginForm.value)
      .subscribe( response => {
        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error','Datos erroneos', 'error');
      });
  }

  // login with google
  // let id_token = googleUser.getAuthResponse().id_token;
  renderButton = () => {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  };
   startApp = async () => {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  
  };
  attachSignin = (element) => {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          let id_token = googleUser.getAuthResponse().id_token;          
          this.usuarioService.loginGoogle(id_token).subscribe( response => {
            // navegar en el dashboard
            this.ngZone.run( () => {
              this.router.navigateByUrl('/');
            });
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  };
}
