import { Component } from '@angular/core'; 

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  filtrosBusqueda: string[] = ["pr", "ue", "ba"];
  filtros = [
    {
      nombre: "Verduras",
      categoria: "Tipo",
      activo: false,
    },
    {
      nombre: "Carnes",
      categoria: "Tipo",
      activo: false,
    },
    {
      nombre: "Pescados",
      categoria: "Tipo",
      activo: false,
    },
    {
      nombre: "Pasta",
      categoria: "Tipo",
      activo: false,
    },
    {
      nombre: "Aperitivos",
      categoria: "Tipo",
      activo: false,
    },
    {
      nombre: "Aceite",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Arroz",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Azúcar",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Comino",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Guisantes",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Harina",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Leche",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Pollo",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Salmón",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Nutriscore A",
      categoria: "Nutriscore",
      activo: false,
    },
    {
      nombre: "Nutriscore B",
      categoria: "Nutriscore",
      activo: false,
    },
    {
      nombre: "Nutriscore C",
      categoria: "Nutriscore",
      activo: false,
    },
    {
      nombre: "Nutriscore D",
      categoria: "Nutriscore",
      activo: false,
    },
    {
      nombre: "Hasta 5€",
      categoria: "Precio",
      activo: false,
    },
    {
      nombre: "Hasta 10€",
      categoria: "Precio",
      activo: false,
    },
    {
      nombre: "Hasta 20€",
      categoria: "Precio",
      activo: false,
    },
    {
      nombre: "Hasta 50€",
      categoria: "Precio",
      activo: false,
    },
  ];
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