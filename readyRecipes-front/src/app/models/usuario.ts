export class Usuario {
    nombre: string;
    apellidos: string;
    email: string;
    pass: string;
    administrador: boolean;

    constructor(_nombre: string, _apellidos: string, _email: string, _pass: string, _administrador: boolean) {
        this.nombre = _nombre;
        this.apellidos = _apellidos;
        this.email = _email;
        this.pass = _pass;
        this.administrador = _administrador;
    }
}