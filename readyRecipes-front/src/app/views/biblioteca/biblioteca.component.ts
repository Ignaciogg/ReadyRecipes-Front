import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  public esAdministrador: boolean = true;
  public respuestaBuscador: number = 0;
  filtros = [
    { nombre: "Verdura", categoria: "Tipo", activo: false, id: -1, visible: true },
    { nombre: "Carne", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pescado", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pasta", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Aperitivo", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "A", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "B", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "C", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "D", categoria: "Nutriscore", activo: false, id: null, visible: true },
    { nombre: "2", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "5", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "10", categoria: "Precio", activo: false, id: null, visible: true },
    { nombre: "15", categoria: "Precio", activo: false, id: null, visible: true},
    { nombre: "Mis favoritos", categoria: "Favoritos", activo: false, id: null, visible: true },
    { nombre: "No favoritos", categoria: "Favoritos", activo: false, id: null, visible: true },
  ];
  resultados: Receta[] = [];
  
  constructor(
    private ingredienteService: IngredienteService,
    private recetaService: RecetaService,
    private variablesGlobales: VariablesGlobalesService,
    private fb:FormBuilder,
  ) { }

  isSubmitted=false;
  
  onPost= ()=>this.isSubmitted=true;

  frm!:FormGroup;

  ngOnInit(): void {
    this.obtenerIngredientes();
    this.resultados = [];
    this.buscador();

    this.frm = this.fb.group({
      'selectedIngredient':[]
   })
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
        if(ingrediente.nombre.includes(valorBuscado)) {
          ingrediente.visible = true;
        } else{
          ingrediente.visible = false;
        }
      }
    });
  }

  numFiltrosActivos(): number {
    let activos = 0;
    this.filtros.forEach(filtro => {
      if(filtro.activo == true) {
        activos++;
      }
    });
    return activos;
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
    let id_receta: number = 0;
    let precioElegido: number = 1000;
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
              case "Nutriscore A": nutriscoreElegido = 4.51; break;
              case "Nutriscore B": nutriscoreElegido = 3.51; break;
              case "Nutriscore C": nutriscoreElegido = 2.51; break;
              case "Nutriscore D": nutriscoreElegido = 1.51; break;
            }
          break;
          case "Favoritos": favoritoElegido = true; break;
        }
      }
    });
    this.recetaService.buscador(
      id_receta,
      precioElegido,
      ingredientesElegidos,
      categoriaElegida,
      nutriscoreElegido,
      favoritoElegido,
      1
    ).subscribe((data: Receta[]) => { 
      data.forEach(receta => {
        let esUnico = true;
        for (let i = 0; i < this.resultados.length; i++) {
          if (receta.id === this.resultados[i].id) {
            esUnico = false;
            break;
          }
        }
        if (esUnico) {
          this.resultados.push(receta);
        }
        
      });
      this.respuestaBuscador = 0;
    }, error => {
      this.respuestaBuscador = 0;
    });
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