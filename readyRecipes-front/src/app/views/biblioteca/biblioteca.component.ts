import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {

  recetas: Receta[] = [];
  cargando: boolean = false;

  constructor(private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.cargando = true;
    this.recetaService.getAll().subscribe(data=> {
      this.recetas = data;
      this.cargando = false;
    });
  }

  public crearReceta() {
    let receta: Receta = new Receta("Nombre de receta", 3.5);
    this.recetaService.create(receta).subscribe(data=> {
      this.cargarRecetas();
    });
  }

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
      nombre: "Berenjenas",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Brócoli",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Calabaza",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Calabacín",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Comino",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Fresa",
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
      nombre: "Melón",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Mermelada",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Plátano",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Pollo",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Sal",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Salmón",
      categoria: "Ingredientes",
      activo: false,
    },
    {
      nombre: "Zanahoria",
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