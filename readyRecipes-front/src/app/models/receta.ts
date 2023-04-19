export class Receta {
    id: number;
    titulo?: string;
    url?: string;
    texto?: string;
    categoria?: string;
    comentarios?: number;
    comentarios_positivos?: number;
    comentarios_neutros?: number;
    comentarios_negativos?: number;
    sentimiento?: number;
    nutriscore?: number;
    ingredientes?: string[];
    precio?: number;

    constructor(_id: number);
    constructor(_id: number, _titulo: string);
    constructor(
        _id: number,
        _url?: string,
        _titulo?: string,
        _texto?: string,
        _categoria?: string,
        _comentarios?: number,
        _comentarios_positivos?: number,
        _comentarios_neutros?: number,
        _comentarios_negativos?: number,
        _sentimiento?: number,
        _nutriscore?: number,
        _precio?: number,
        _ingredientes?: string[],
    ) {
        this.id = _id;
        this.titulo = _titulo ?? "";
        this.url = _url ?? "";
        this.texto = _texto ?? "";
        this.categoria = _categoria ?? "";
        this.comentarios = _comentarios ?? -1;
        this.comentarios_positivos = _comentarios_positivos ?? -1;
        this.comentarios_neutros = _comentarios_neutros ?? -1;
        this.comentarios_negativos = _comentarios_negativos ?? -1;
        this.sentimiento = _sentimiento ?? -1;
        this.nutriscore = _nutriscore ?? -1;
        this.precio = _precio ?? -1;
        this.ingredientes = _ingredientes ?? [];
    }
}