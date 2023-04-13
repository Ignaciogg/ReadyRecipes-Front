import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

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
      this.usuarioService.login(usuario).subscribe(data => {
        if(typeof data == "number") {
          this.respuesta = data;
        } else {
          this.respuesta = 200; // Recuperamos el error. Si no falla, devolvera un objeto vacio
          localStorage.setItem("correoUsuario", email);
          this.router.navigate(['/biblioteca']);
        }
      });
    }
  }
}
