import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'readyRecipes-front';
  refreshPeriod: number = 60_000;

  constructor(
    public router: Router,
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      try {
        const helper = new JwtHelperService();
        const expirationDate = helper.getTokenExpirationDate(this.autenticacionService.getToken());
        console.log(expirationDate!.getTime() - Date.now());
        if((expirationDate!.getTime() - Date.now()) < (this.refreshPeriod * 2)) {
          this.autenticacionService.refreshToken().subscribe(data => {
            this.autenticacionService.setToken(data);
            console.log("Token refrescado")
          });
        }
      } catch(Error) {
        console.log("Token aún válido");
      }
    }, this.refreshPeriod);
  }

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