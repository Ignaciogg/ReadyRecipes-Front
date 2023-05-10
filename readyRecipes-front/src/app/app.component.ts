import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'readyRecipes-front';

  usuario: Usuario = new Usuario("", "", "", "", false);

  constructor(
    public router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.infoUsuarioActual().subscribe(data => {
      this.usuario = data;
    });
  }

  logout(): void {
    localStorage.setItem("token", "");
    this.usuario = new Usuario("", "", "", "", false);
  }
}