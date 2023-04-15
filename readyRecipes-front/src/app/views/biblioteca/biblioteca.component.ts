import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {

  recetas: Receta[] = [];
  cargando: boolean = false;

  filtros = [
    { nombre: "Verduras", categoria: "Tipo", activo: false },
    { nombre: "Carnes", categoria: "Tipo", activo: false },
    { nombre: "Pescados", categoria: "Tipo", activo: false },
    { nombre: "Pasta", categoria: "Tipo", activo: false },
    { nombre: "Aperitivos", categoria: "Tipo", activo: false },
    { nombre: "Nutriscore A", categoria: "Nutriscore", activo: false },
    { nombre: "Nutriscore B", categoria: "Nutriscore", activo: false },
    { nombre: "Nutriscore C", categoria: "Nutriscore", activo: false },
    { nombre: "Nutriscore D", categoria: "Nutriscore", activo: false },
    { nombre: "Hasta 5€", categoria: "Precio", activo: false },
    { nombre: "Hasta 10€", categoria: "Precio", activo: false },
    { nombre: "Hasta 20€", categoria: "Precio", activo: false},
    { nombre: "Hasta 50€", categoria: "Precio", activo: false },
    { nombre: "Mis favoritos", categoria: "Favoritos", activo: false },
  ];
  resultados = [
    { nombre: "Receta encontrada 1", ruta: "https://www.google.com/" },
    { nombre: "Receta encontrada 2", ruta: "https://www.google.com/" },
    { nombre: "Receta encontrada 3", ruta: "https://www.google.com/" },
    { nombre: "Receta encontrada 4", ruta: "https://www.google.com/" },
    { nombre: "Receta encontrada 5", ruta: "https://www.google.com/" },
  ];
  
  constructor(
    private ingredienteService: IngredienteService,
  ) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  async obtenerIngredientes() {
    this.ingredienteService.getAll().subscribe(data => {
      data.forEach(ingrediente => this.filtros.push({
          nombre: ingrediente.nombre,
          categoria: "Ingredientes",
          activo: false,
        }));
    });
    console.log();
  }

  buscarTipo(tipo: string) {
    for(let i=0; i<this.filtros.length; i++) {
      if(this.filtros[i].categoria == "Tipo") {
        if(this.filtros[i].nombre == tipo) {
          this.filtros[i].activo = true;
        } else {
          this.filtros[i].activo = false;
        }
      }
    }
    window.scrollTo(0, document.body.scrollHeight);
  }

  activarFiltro(elegido: string) {
    for(let i=0; i<this.filtros.length; i++) {
      if(this.filtros[i].nombre == elegido) {
        switch(this.filtros[i].categoria) {
          case "Nutriscore":
            for(let i=0; i<this.filtros.length; i++) {
              if(this.filtros[i].categoria == "Nutriscore") {
                this.filtros[i].activo = false;
              }
            }
          break;
          case "Precio":
            for(let i=0; i<this.filtros.length; i++) {
              if(this.filtros[i].categoria == "Precio") {
                this.filtros[i].activo = false;
              }
            }
          break;
        }
        this.filtros[i].activo = true;
      }
    }
  }

  eliminarFiltro(elegido: string) {
    for(let i=0; i<this.filtros.length; i++) {
      if(this.filtros[i].nombre == elegido) {
        this.filtros[i].activo = false;
      }
    }
  }
}