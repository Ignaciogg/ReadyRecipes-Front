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

  myChart: any;
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

  constructor(
    private recetaService: RecetaService,
    private usuarioService: UsuarioService
  ) {}

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
    this.myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: ['Aperitivos', 'Carnes', 'Pastas', 'Pescados', 'Verduras',],
        datasets: [{
          data: [5, 8, 3, 9, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 192, 86, 0.7)'
          ]
        }]
      }
    });
  }
}