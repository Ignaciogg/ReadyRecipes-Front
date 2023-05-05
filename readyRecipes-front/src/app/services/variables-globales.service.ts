import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {

  private nombreUsuario: string;
  private apellidosUsuario: string;
  private correoUsuario: string;

  constructor() {
    this.nombreUsuario = "";
    this.apellidosUsuario = "";
    this.correoUsuario = "";
  }

  setNombreUsuario(_nombre: string) {
    this.nombreUsuario = _nombre;
    localStorage.setItem("nombreUsuario", _nombre);
  }

  getNombreUsuario(): string {
    if (!this.nombreUsuario) {
      this.nombreUsuario = localStorage.getItem("nombreUsuario") ?? "";
    }
    return this.nombreUsuario;
  }

  setApellidosUsuario(_apellidos: string) {
    this.apellidosUsuario = _apellidos;
    localStorage.setItem("apellidosUsuario", _apellidos);
  }

  getApellidosUsuario(): string {
    if (!this.apellidosUsuario) {
      this.apellidosUsuario = localStorage.getItem("apellidosUsuario") ?? "";
    }
    return this.apellidosUsuario;
  }

  setCorreoUsuario(_correo: string) {
    this.correoUsuario = _correo;
    localStorage.setItem("correoUsuario", _correo);
  }

  getCorreoUsuario(): string {
    if (!this.correoUsuario) {
      this.correoUsuario = localStorage.getItem("correoUsuario") ?? "";
    }
    return this.correoUsuario;
  }

  setRecetaActual(_id: number) {
    localStorage.setItem("recetaActual", _id.toString());
  }

  getRecetaActual(): number {
    return Number(localStorage.getItem("recetaActual"));
  }
}