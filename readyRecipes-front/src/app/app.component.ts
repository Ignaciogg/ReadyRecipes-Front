import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'readyRecipes-front';

  constructor(
    public router: Router,
    private autenticacionService: AutenticacionService
  ) { }

  getNombre(): string {
    return this.autenticacionService.getNombre() ?? "";
  }

  getEmail(): string {
    return this.autenticacionService.getEmail() ?? "";
  }

  estaLogeado(): boolean {
    return this.autenticacionService.estaLogeado();
  }

  logout(): void {
    this.autenticacionService.logout();
  }
}