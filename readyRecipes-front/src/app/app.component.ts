import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from './services/variables-globales.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'readyRecipes-front';

  constructor(
    public router: Router,
    private variablesGlobalesService: VariablesGlobalesService) { }

  getNombreUsuario(): string {
    return this.variablesGlobalesService.getNombreUsuario();
  }

  getCorreoUsuario(): string {
    return this.variablesGlobalesService.getCorreoUsuario();
  }

  logout(): void {
    this.variablesGlobalesService.setNombreUsuario("");
    this.variablesGlobalesService.setApellidosUsuario("");
    this.variablesGlobalesService.setCorreoUsuario("");
  }
}