import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

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
    private variablesGlobalesService: VariablesGlobalesService
    ) { }

  public async login(email: string, password: string) {
    this.respuesta = -1;
    if(email == "") {
      this.respuesta = -2;
    } else if(password == "") {
      this.respuesta = -3;
    } else {
      let usuario: Usuario = new Usuario("", "", email, password, false);
      this.usuarioService.login(usuario).subscribe(async data => {
        console.log("Recuperamos del back los datos:", data);
        this.respuesta = 200;
        this.router.navigate(['/biblioteca']);
        console.log("LOCALSTORAGE:");
        console.log("Nombre: ", localStorage.getItem('nombreUsuario'));
        console.log("Apellidos: ", localStorage.getItem('apellidosUsuario'));
        console.log("Correo: ", localStorage.getItem('correoUsuario'));
        this.variablesGlobalesService.setNombreUsuario(data.nombre);
        this.variablesGlobalesService.setApellidosUsuario(data.apellidos);
        this.variablesGlobalesService.setCorreoUsuario(data.email);
      });
    }
  }
}
