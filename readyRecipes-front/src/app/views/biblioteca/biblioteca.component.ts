import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Ingrediente } from 'src/app/models/ingrediente';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss'],
})

export class BibliotecaComponent implements OnInit {

  public esAdministrador: boolean = false;
  public respuestaBuscador: number = 0;
  public buscandoEnFavoritos: boolean = false;
  public buscandoNutriscore: string = "E";
  filtros = [
    { nombre: "Verdura", categoria: "Tipo", activo: false, id: -1, visible: true },
    { nombre: "Carne", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pescado", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Pasta", categoria: "Tipo", activo: false, id: null, visible: true },
    { nombre: "Aperitivos", categoria: "Tipo", activo: false, id: null, visible: true },
  ];
  resultados: Receta[] = [];
  usuarioLogeado: Usuario = new Usuario();
  finalIngredientes : Ingrediente[] = [];

  constructor(
    private ingredienteService: IngredienteService,
    private recetaService: RecetaService,
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
  ) {}

  selectedIngredient!: number;
  isSubmitted=false;
  onPost= ()=>this.isSubmitted=true;


  ngOnInit(): void {
    this.obtenerIngredientes();
    this.resultados = [];
    this.buscador();
    this.recuperarUsuario();
    this.esAdmin();
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

  filtrarIngredientes(valorBuscado: any) {
    console.log("Esto es valorBuscado:", valorBuscado);
    this.finalIngredientes = valorBuscado;
    this.buscador();
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
  }
  
  buscador() {
    this.respuestaBuscador = -1;
    this.resultados = [];
    let precioElegido: number = 1000;
    let categoriaElegida: string = "";
    this.filtros.forEach(filtro => {
      if(filtro.activo == true) {
        switch(filtro.categoria) {
          case "Precio": precioElegido = Number(filtro.nombre); break;
          case "Tipo": categoriaElegida = filtro.nombre; break;
          case "Nutriscore":
            break;
          }
        }
    });
    this.recetaService.buscador(
      0,
      precioElegido,
      this.finalIngredientes.map(ingr => ingr.id),
      categoriaElegida,
      this.nutriscoreToNumber(this.buscandoNutriscore),
      this.buscandoEnFavoritos,
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

  elegirNutriscore(nutriscore: string) {
    if(this.buscandoNutriscore == nutriscore) {
      this.buscandoNutriscore = "E";
      this.buscador();
    } else {
      this.buscandoNutriscore = nutriscore;
      this.buscador();
    }
  }

  nutriscoreToNumber(letra: string): number {
    let resultado: number = 0;
    switch(letra) {
      case "A": resultado = 4.51; break;
      case "B": resultado = 3.51; break;
      case "C": resultado = 2.51; break;
      case "D": resultado = 1.51; break;
    }
    return resultado;
  }

  activarFiltro(elegido: string, filtro: any) {
    if(filtro.activo == false) {
      filtro.activo = true;
      for(let i=0; i<this.filtros.length; i++) {
        if(this.filtros[i].nombre == elegido) {
          switch(this.filtros[i].categoria) {
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
    } else {
      filtro.activo = false;
      this.buscador();
    }
  }

  recuperarUsuario(): void {
    this.usuarioService.me().subscribe(data => {
      this.usuarioLogeado = data;
    });
  }

  estaLogeado() {
    return this.autenticacionService.estaLogeado();
  }

  esAdmin() {
    this.esAdministrador = this.autenticacionService.getAdmin();
  }

  toggleFavoritos() {
    this.buscandoEnFavoritos = !this.buscandoEnFavoritos;
    this.buscador();  
  }
}