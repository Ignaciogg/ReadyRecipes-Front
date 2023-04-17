export class Comentario {
    id: number;
    contenido: string;
    id_receta: number;
    id_usuario: number;
    nombre: string;

    constructor(
        _id: number,
        _contenido: string,
        _id_receta: number,
        _id_usuario: number,
        _nombre: string
    ) {
        this.id = _id;
        this.contenido = _contenido;
        this.id_receta = _id_receta;
        this.id_usuario = _id_usuario;
        this.nombre = _nombre;
    }
}