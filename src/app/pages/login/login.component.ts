import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  cargando = false;
  enviado = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router, 
              private authService: AuthService) {
    // Redirecciona a la página de inicio si esta autenticado
    if (this.authService.usuarioActualAsUsuario) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.formulario.controls; }

  autenticar() {
    this.enviado = true;

    // stop here if form is invalid
    if (this.formulario.invalid) {
      return;
    }

    this.cargando = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.enviado = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error.status);
          this.error = error.status && error.stsatus !== 200 ? 'No fue posible ingresar': '';
          this.cargando = false;
          this.enviado = false;
        });
  }

}
