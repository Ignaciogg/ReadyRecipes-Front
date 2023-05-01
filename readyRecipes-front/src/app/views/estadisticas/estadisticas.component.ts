import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  usuarioBorrarInput: string = "";
  recetaModificarInput: string = "";
  receta?: Receta = { id: -1 };
  usuario?: Usuario = { nombre: "", apellidos: "", email: "", pass: "", administrador: false };

  constructor(private recetaService: RecetaService) { }

  idValido(_id: string): boolean {
    return !isNaN(Number(_id)) && _id != "";
  }

  recibirUsuario(_id: string): void {
    this.usuario = undefined;
    // usuarioService -> getUsuario(id) -> subscribe(data => this.usuario = data)
    // Rellenar datos del usuario
  }

  async recibirReceta(_id: string): Promise<void> {
    this.receta = undefined;
    this.recetaService.post(Number(this.recetaModificarInput)).subscribe(data => {
      this.receta = data;
      console.log(this.receta);
    });
  }
}