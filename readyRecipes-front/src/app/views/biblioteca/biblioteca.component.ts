import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {

  recetas: Receta[] = [];
  public respuestaBuscador: number = 0;

  filtros = [
    { nombre: "Verdura", categoria: "Tipo", activo: false, id: -1 },
    { nombre: "Carne", categoria: "Tipo", activo: false, id: null },
    { nombre: "Pescado", categoria: "Tipo", activo: false, id: null },
    { nombre: "Pasta", categoria: "Tipo", activo: false, id: null },
    { nombre: "Aperitivos", categoria: "Tipo", activo: false, id: null },
    { nombre: "Nutriscore A", categoria: "Nutriscore", activo: false, id: null },
    { nombre: "Nutriscore B", categoria: "Nutriscore", activo: false, id: null },
    { nombre: "Nutriscore C", categoria: "Nutriscore", activo: false, id: null },
    { nombre: "Nutriscore D", categoria: "Nutriscore", activo: false, id: null },
    { nombre: "5", categoria: "Precio", activo: false, id: null },
    { nombre: "10", categoria: "Precio", activo: false, id: null },
    { nombre: "20", categoria: "Precio", activo: false, id: null},
    { nombre: "50", categoria: "Precio", activo: false, id: null },
    { nombre: "Mis favoritos", categoria: "Favoritos", activo: false, id: null },
  ];
  resultados = [
    { nombre: "Receta de prueba", id: -1 },
  ];
  
  constructor(
    private ingredienteService: IngredienteService,
    private recetaService: RecetaService,
    private variablesGlobales: VariablesGlobalesService,
  ) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
    this.resultados = [];
    this.buscador();
  }

  async obtenerIngredientes() {
    this.ingredienteService.getAll().subscribe(data => {
      data.forEach(ingrediente => this.filtros.push({
          nombre: ingrediente.nombre.concat(" (id ", ingrediente.id.toString(), ")"),
          categoria: "Ingredientes",
          activo: false,
          id: ingrediente.id,
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
  
  buscador() {
    this.respuestaBuscador = -1;
    this.resultados = [];
    let precioElegido: number = -1;
    let ingredientesElegidos: number[] = [];
    let categoriaElegida: string = "";
    let nutriscoreElegido: number = 0;
    let favoritoElegido: boolean = false;
    this.filtros.forEach(filtro => {
      if(filtro.activo == true) {
        switch(filtro.categoria) {
          case "Precio": precioElegido = Number(filtro.nombre); break;
          case "Ingredientes": ingredientesElegidos.push(filtro.id!); break;
          case "Tipo": categoriaElegida = filtro.nombre; break;
          case "Nutriscore":
            switch(filtro.nombre) {
              case "Nutriscore A": nutriscoreElegido = 1; break;
              case "Nutriscore B": nutriscoreElegido = 2; break;
              case "Nutriscore C": nutriscoreElegido = 3; break;
              case "Nutriscore D": nutriscoreElegido = 4; break;
            }
          break;
          case "Favoritos": favoritoElegido = true; break;
        }
      }
    });
    try {
      this.recetaService.buscador(
        precioElegido,
        ingredientesElegidos,
        categoriaElegida,
        nutriscoreElegido,
        favoritoElegido,
        1
      ).subscribe(data => {
        data.forEach(receta => {
          this.resultados.push({ nombre: receta.titulo!, id: receta.id });
        });
        console.log("EL ENDPOINT DEVUEVE:", data);
        this.respuestaBuscador = 0;
      });
    } catch (error) {
      console.log("Error en la llamada al buscador: " + error);
      this.respuestaBuscador = 0;
    }
    // console.log("Buscando recetas con precio <= " + precioElegido + "€,"
    //  + " con los ingredientes " + ingredientesElegidos + ","
    //  + " de categoría " + categoriaElegida + ","
    //  + " con nutriscore de " + nutriscoreElegido + " o mas,"
    //  + " que sean favoritas=[" + favoritoElegido + "]"
    //  + " y con id_usuario = " + 1);
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
          case "Tipo":
            for(let i=0; i<this.filtros.length; i++) {
              if(this.filtros[i].categoria == "Tipo") {
                this.filtros[i].activo = false;
              }
            }
          break;
        }
        this.filtros[i].activo = true;
      }
    }
    this.buscador();
  }

  eliminarFiltro(elegido: string) {
    for(let i=0; i<this.filtros.length; i++) {
      if(this.filtros[i].nombre == elegido) {
        this.filtros[i].activo = false;
      }
    }
    this.buscador();
  }

  estaLogeado() {
    return (this.variablesGlobales.getCorreoUsuario());
  }
}