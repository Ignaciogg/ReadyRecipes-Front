import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  respuesta: number = 0;
  nombreInput: string = "";
  apellidosInput: string = "";
  emailInput: string = "";
  passwordInput: string = "";
  repetirPasswordInput: string = "";
  constructor(private usuarioService: UsuarioService) { }

  public registrar(nombre: string, apellidos: string, email: string, password: string, repetirPassword: string) {
    this.respuesta = -1;
    const regexNumeros = /\d/;
    const regexMayus = /[A-Z]/;
    const regexMinus = /[a-z]/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(nombre == "") {
      this.respuesta = -2;
    } else if(apellidos == "") {
      this.respuesta = -3;
    } else if(email == "") {
      this.respuesta = -4;
    } else if(password == "") {
      this.respuesta = -5;
    } else if(repetirPassword == "") {
      this.respuesta = -6;
    } else if(regexNumeros.test(nombre)) {
      this.respuesta = -7;
    } else if(regexNumeros.test(apellidos)) {
        this.respuesta = -8;
    } else if(!regexCorreo.test(email)) {
      this.respuesta = -9;
    } else if(password.length < 6) {
      this.respuesta = -10;
    } else if(password.length > 16) {
      this.respuesta = -11;
    } else if(!regexMayus.test(password) || !regexMinus.test(password) || !regexNumeros.test(password)) {
      this.respuesta = -12;
    } else if(password != repetirPassword) {
      this.respuesta = -13;
    } else {
      let usuario: Usuario = new Usuario(nombre, apellidos, email, password, false);
      this.usuarioService.registrar(usuario).subscribe(data => {
        if(typeof data == "number") {
          this.respuesta = data;
        } else {
          this.respuesta = 200; // Recuperamos el error. Si no falla, devolvera un objeto vacio
        }
      });
    }
  }
}