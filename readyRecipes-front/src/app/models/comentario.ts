import { Usuario } from "./usuario";

export class Comentario {
    contenido: string;
    usuario: Usuario[];

    constructor(
        _contenido: string,
        _usuario: Usuario[],
    ) {
        this.contenido = _contenido;
        this.usuario = _usuario;
    }
}