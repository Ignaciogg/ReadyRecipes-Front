export class Comentario {
    id: number;
    contenido: string;
    id_Receta: number;
    id_Usuario: number;

    constructor(_id: number, _contenido: string, _id_Receta: number, _id_Usuario: number) {
        this.id = _id;
        this.contenido = _contenido;
        this.id_Receta = _id_Receta;
        this.id_Usuario = _id_Usuario;
    }
}