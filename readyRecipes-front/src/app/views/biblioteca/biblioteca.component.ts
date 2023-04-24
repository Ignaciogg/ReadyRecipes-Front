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
    { nombre: "Verdura", categoria: "Tipo", activo: false, id: -1, visible: true },
    { nombre: "Carne", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pescado", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pasta", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Aperitivo", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Nutriscore A", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "Nutriscore B", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "Nutriscore C", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "Nutriscore D", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "5", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "10", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "20", categoria: "Precio", activo: false, id: null, visible: true},
    { nombre: "50", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "Mis favoritos", categoria: "Favoritos", activo: false, id: null, visible: true },
  ];
  resultados: Receta[] = [];
  
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
          nombre: ingrediente.nombre,
          categoria: "Ingredientes",
          activo: false,
          id: ingrediente.id,
          visible: true,
        }));
    });
  }

  async filtrarIngredientes(event: any) {
    const valorBuscado = event.target.value.toLowerCase();
      this.filtros.forEach(ingrediente => {
        if(ingrediente.categoria=="Ingredientes"){
          if (ingrediente.nombre.includes(valorBuscado)) {
            ingrediente.visible = true;
          }else{
            ingrediente.visible = false;
          }
        }
      });
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
    this.buscador();
    window.scrollTo(0, document.body.scrollHeight);
  }
  
  buscador() {
    this.respuestaBuscador = -1;
    this.resultados = [];
    let precioElegido: number = -1;
    let ingredientesElegidos: number[] = [];
    let categoriaElegida: string = "";
    let nutriscoreElegido: number = -1;
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
        console.log("Buscando recetas con precio < " + precioElegido + ", ingredientes: " + ingredientesElegidos + ", categoria: " + categoriaElegida + ", nutriscore > " + nutriscoreElegido + ", favorito: " + favoritoElegido);
        data.forEach(receta => {
          this.resultados.push(receta);
        });
      });
    } catch (error) {
      console.log("Error en la llamada al buscador: " + error);
    }
    this.respuestaBuscador = 0;
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