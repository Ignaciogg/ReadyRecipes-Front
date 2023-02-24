import { Component } from '@angular/core';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  filtrosBusqueda: string[] = ["pr", "ue", "ba"];
  ingredientes: string[] = ["Aceite", "Arroz", "Azúcar", "Comino", "Guisantes", "Harina", "Leche", "Pollo", "Salmón"];
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