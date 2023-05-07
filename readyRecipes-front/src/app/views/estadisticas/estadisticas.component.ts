import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  myChartCategorias: any;
  myChartUsuarios: any;
  usuarioBorrarInput: string = "";
  recetaModificarInput: string = "";
  tituloOriginal: string = "";
  textoOriginal: string = "";
  categoriaOriginal: string = "";
  receta?: Receta = { id: -1 };
  usuario?: Usuario = { nombre: "", apellidos: "", email: "", pass: "", administrador: false };
  alerta: boolean = false;
  esperandoEliminar: boolean = false;
  enviandoReceta: boolean = false;
  nombresCategorias: string[] = [];
  cantidadesCategorias: number[] = [];
  fechasUsuarios: string[] = [];
  cantidadesUsuarios: number[] = [];
  numUsuarios: number = 0;
  numRecetas: number = 0;
  numComentarios: number = 0;

  constructor(
    private recetaService: RecetaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.recibirCategorias();
    this.recibirUsuarios();
  }

  recibirCategorias(): void {
    this.recetaService.recetasPorCategoria().subscribe(data => {
      data.forEach((n: {categoria: string, total: number}) => {
        this.nombresCategorias.push(n.categoria);
        this.cantidadesCategorias.push(n.total);
      });
      this.myChartCategorias.update();
    });
  }

  recibirUsuarios(): void {
    this.usuarioService.numeroUsuarios().subscribe(data => {
      for(const fecha in data) {
        if (data.hasOwnProperty(fecha)) {
          this.fechasUsuarios.push(fecha);
          this.cantidadesUsuarios.push(data[fecha]);
        }
      }
      this.myChartUsuarios.update();
    });
  }

  idValido(_id: string): boolean {
    return !isNaN(Number(_id)) && _id != "";
  }

  recibirUsuario(_id: string): void {
    this.usuario = undefined;
    this.usuarioService.infoUsuario(Number(this.usuarioBorrarInput)).subscribe(data => {
      this.usuario = data;
      this.alerta = true;
    });
  }

  eliminarUsuario(): void {
    this.esperandoEliminar = true;
    this.usuarioService.eliminarUsuario(this.usuario!.email).subscribe(data => {
      console.log("Eliminando usuario con correo: " + this.usuario!.email);
      this.esperandoEliminar = false;
      this.receta = { id: -1 };;
      this.usuarioBorrarInput = "";
      this.alerta = false;
    });
  }

  cerrarAlerta() {
    this.alerta = false;
  }

  async recibirReceta(_id: string): Promise<void> {
    this.receta = undefined;
    this.recetaService.post(Number(this.recetaModificarInput)).subscribe(data => {
      this.receta = data;
      this.tituloOriginal = this.receta.titulo!;
      this.textoOriginal = this.receta.texto!;
      this.categoriaOriginal = this.receta.categoria!;
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
    this.recetaService.modificarReceta(this.receta!).subscribe(data => {
      this.receta = { id: -1 };
      this.recetaModificarInput = "";
      this.enviandoReceta = false;
    });
  }

  cambiarCategoria(_categoria: string): void {
    this.receta!.categoria = _categoria;
  }

  ngAfterViewInit() {
    this.myChartCategorias = new Chart("myChartCategorias", {
      type: 'pie',
      data: {
        labels: this.nombresCategorias,
        datasets: [{
          data: this.cantidadesCategorias,
          backgroundColor: [ "#E7E", "#EA7", "#EE7", "#7AE", "#7EA" ],
          hoverOffset: 30,
        }],
      },
    });
    this.myChartUsuarios = new Chart("myChartUsuarios", {
      type: 'line',
      data: {
        labels: this.fechasUsuarios as unknown as Date[],
        datasets: [{
          label: "Número de usuarios",
          data: this.cantidadesUsuarios
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
}