import { Component } from '@angular/core';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  resultados = [
    {
      nombre: "Receta encontrada 1",
      ruta: "https://www.google.com/",
    },
    {
      nombre: "Receta encontrada 2",
      ruta: "https://www.google.com/",
    },
    {
      nombre: "Receta encontrada 3",
      ruta: "https://www.google.com/",
    },
    {
      nombre: "Receta encontrada 4",
      ruta: "https://www.google.com/",
    },
    {
      nombre: "Receta encontrada 5",
      ruta: "https://www.google.com/",
    },
  ];
}