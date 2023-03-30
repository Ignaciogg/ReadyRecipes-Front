export class Receta {
    id?: number;
    nombre: string;
    precio: number;

    constructor(_nombre: string, _precio: number) {
        this.nombre = _nombre;
        this.precio = _precio;
    }
}