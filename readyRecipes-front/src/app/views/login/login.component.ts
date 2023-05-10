import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  respuesta: number = 0;
  emailInput: string = "";
  passwordInput: string = "";

  constructor(
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    private router: Router,
    ) { }

  public async login(email: string, password: string) {
    this.respuesta = -1;
    if(email == "") {
      this.respuesta = -2;
    } else if(password == "") {
      this.respuesta = -3;
    } else {
      let usuario: Usuario = new Usuario("", "", email, password, false);
      this.autenticacionService.login(usuario).subscribe(async data => {
        this.respuesta = 200;
        localStorage.setItem("token", data.access_token);
        this.router.navigate(['/biblioteca']);
      });
    }
  }
}
