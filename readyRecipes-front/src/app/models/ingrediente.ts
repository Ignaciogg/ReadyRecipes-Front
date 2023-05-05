export class Ingrediente {
    id: number;
    nombre: string;
    nutriscore: number;

    constructor(_id: number, _nombre: string, _nutriscore: number) {
        this.id = _id;
        this.nombre = _nombre;
        this.nutriscore = _nutriscore;
    }
}
