export class Usuario {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    administrador?: boolean;

    constructor();
    constructor(
        _id?: number,
        _nombre?: string,
        _apellidos?: string,
        _email?: string,
        _administrador?: boolean
    ) {
        this.id = _id ?? 0;
        this.nombre = _nombre ?? "";
        this.apellidos = _apellidos ?? "";
        this.email = _email ?? "";
        this.administrador = _administrador ?? false;
    }
}