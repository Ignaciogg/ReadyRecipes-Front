import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Chart } from 'chart.js/auto';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  chartCategorias: any;
  chartUsuarios: any;
  chartComentarios: any;
  chartNutriscore: any;
  usuarioBorrarInput: string = "";
  recetaModificarInput: string = "";
  tituloOriginal: string = "";
  textoOriginal: string = "";
  categoriaOriginal: string = "";
  receta?: Receta = { id: -1 };
  usuario?: Usuario = new Usuario();
  alerta: boolean = false;
  esperandoEliminar: boolean = false;
  enviandoReceta: boolean = false;
  nombresCategorias: string[] = [];
  cantidadesCategorias: number[] = [];
  fechasUsuarios: string[] = [];
  fechasComentarios: string[] = [];
  cantidadesUsuarios: number[] = [];
  cantidadesComentarios: number[] = [];
  ratingsNutriscore: number[] = [];
  cantidadesNutriscore: number[] = [];
  numRecetas: number = 0;
  errorEliminar: boolean = false;
  inputColorPrincipal: string = "";
  inputColorPrincipalClaro: string = "";
  inputColorSecundario: string = "";

  constructor(
    private recetaService: RecetaService,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private adminService: AdministradorService,
  ) {}

  ngOnInit(): void {
    this.recibirCategorias();
    this.recibirNutriscore();
    this.recibirUsuarios();
    this.recibirComentarios();
  }
  
  recibirCategorias(): void {
    this.recetaService.recetasPorCategoria().subscribe(data => {
      data.forEach((n: {categoria: string, total: number}) => {
        this.nombresCategorias.push(n.categoria);
        this.cantidadesCategorias.push(n.total);
        this.numRecetas += n.total;
      });
      this.chartCategorias.update();
    });
  }

  recibirNutriscore(): void {
    this.recetaService.recetasPorNutriscore().subscribe(data => {
      data.forEach((n: {nutriscore_rounded: number, total: number}) => {
        this.ratingsNutriscore.push(n.nutriscore_rounded);
        this.cantidadesNutriscore.push(n.total);
      });
      this.chartNutriscore.update();
    });
  }

  recibirUsuarios(): void {
    this.usuarioService.numeroUsuarios().subscribe(data => {
      for(const fecha in data) {
        if(data.hasOwnProperty(fecha)) {
          this.fechasUsuarios.push(fecha);
          this.cantidadesUsuarios.push(data[fecha]);
        }
      }
      this.chartUsuarios.update();
    });
  }
  
  recibirComentarios(): void {
    this.comentarioService.numeroComentarios().subscribe(data => {
      for(const fecha in data) {
        if(data.hasOwnProperty(fecha)) {
          this.fechasComentarios.push(fecha);
          this.cantidadesComentarios.push(data[fecha]);
        }
      }
      this.chartComentarios.update();
    });
  }

  idValido(_id: string): boolean {
    return !isNaN(Number(_id)) && _id != "";
  }

  recibirUsuario(_id: string): void {
    this.esperandoEliminar = true;
    this.usuario = undefined;
    this.usuarioService.infoUsuario(Number(this.usuarioBorrarInput)).subscribe(data => {
      if(data == null) {
        this.errorEliminar = true;
        this.usuario = new Usuario();
      } else {
        this.esperandoEliminar = false;
        this.usuario = data;
        this.alerta = true;
      }
    }, () => {
      this.errorEliminar = true;
    });
  }

  eliminarUsuario(): void {
    this.usuarioService.eliminarUsuario(this.usuario!.email!).subscribe(() => {
      this.esperandoEliminar = false;
      this.receta = { id: -1 };
      this.usuarioBorrarInput = "";
      this.alerta = false;
    }, () => {
      this.errorEliminar = true;
    });
  }

  cerrarAlerta() {
    this.alerta = false;
    this.errorEliminar = false;
  }

  recibirReceta(_id: string): void {
    this.receta = undefined;
    this.recetaService.get(Number(this.recetaModificarInput)).subscribe(data => {
      this.receta = data;
      this.tituloOriginal = this.receta.titulo!;
      this.textoOriginal = this.receta.texto!;
      this.categoriaOriginal = this.receta.categoria!;
    }, () => {
      this.recetaModificarInput = "¡Id no válido!";
      this.receta = { id: -1 };
    });
  }

  mostrarBotonActualizarReceta() {
    if(this.tituloOriginal != this.receta!.titulo ||
      this.textoOriginal != this.receta!.texto ||
      this.categoriaOriginal != this.receta!.categoria) {
      return true;
    } else {
      return false;
    }
  }

  async modificarReceta(): Promise<void> {
    this.enviandoReceta = true;
    this.recetaService.modificarReceta(this.receta!).subscribe(() => {
      this.receta = { id: -1 };
      this.recetaModificarInput = "";
      this.enviandoReceta = false;
    });
  }

  cambiarCategoria(_categoria: string): void {
    this.receta!.categoria = _categoria;
  }

  getColorPrincipal(): string {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue("--colorPrincipal").trim();
  }

  getColorSecundario(): string {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue("--colorSecundario").trim();
  }

  ngAfterViewInit() {
    this.chartCategorias = new Chart("chartCategorias", {
      type: "pie",
      data: {
        labels: this.nombresCategorias,
        datasets: [{
          data: this.cantidadesCategorias,
          backgroundColor: [ "#962296", "#CC5522", "#CCCC22", "#225596", "#229655" ],
          hoverOffset: 30,
        }],
      },
    });
    this.chartNutriscore = new Chart("chartNutriscore", {
      type: "bar",
      data: {
        labels: this.ratingsNutriscore as unknown as Date[],
        datasets: [{
          label: "Recetas por nutriscore",
          borderColor: this.getColorPrincipal(),
          backgroundColor: this.getColorPrincipal(),
          data: this.cantidadesNutriscore,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.chartUsuarios = new Chart("chartUsuarios", {
      type: "line",
      data: {
        labels: this.fechasUsuarios as unknown as Date[],
        datasets: [{
          label: "Usuarios registrados",
          borderColor: this.getColorPrincipal(),
          backgroundColor: this.getColorPrincipal(),
          data: this.cantidadesUsuarios,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.chartComentarios = new Chart("chartComentarios", {
      type: "line",
      data: {
        labels: this.fechasComentarios as unknown as Date[],
        datasets: [{
          label: "Comentarios",
          borderColor: this.getColorPrincipal(),
          backgroundColor: this.getColorPrincipal(),
          data: this.cantidadesComentarios,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  colorValido(inputColorPrincipal: string): boolean {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(inputColorPrincipal);
  }

  cambiarColor(inputColorPrincipal: string): void {
    if(this.colorValido(inputColorPrincipal)) {
      document.documentElement.style.setProperty('--colorPrincipal', inputColorPrincipal);
      this.adminService.cambiarPrincipal(inputColorPrincipal).subscribe(() => {
        window.location.reload();
      });
    }
  }

  cambiarColorS(inputColorSecundario: string): void {
    if(this.colorValido(inputColorSecundario)) {
      document.documentElement.style.setProperty('--colorSecundario', inputColorSecundario);
      this.adminService.cambiarSecundario(inputColorSecundario).subscribe(() => {
        window.location.reload();
      });
    }
  }
  
  cambiarColorC(inputColorPrincipalClaro: string): void {
    if(this.colorValido(inputColorPrincipalClaro)) {
      document.documentElement.style.setProperty('--colorPrincipalClaro', inputColorPrincipalClaro);
      this.adminService.cambiarClaro(inputColorPrincipalClaro).subscribe(() => {
        window.location.reload();
      });
    }
  }
}