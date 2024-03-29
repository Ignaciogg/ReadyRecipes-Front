import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  respuesta: number = 0;
  emailInput: string = "";
  passwordInput: string = "";

  constructor(
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    private router: Router,
    ) { }

  public async login(email: string, password: string) {
    this.respuesta = -1;
    if(email == "") {
      this.respuesta = -2;
    } else if(password == "") {
      this.respuesta = -3;
    } else {
      this.autenticacionService.login(email, password).subscribe(dataLogin => {
        this.autenticacionService.setToken(dataLogin.access_token);
        this.usuarioService.me().subscribe(dataMe => {
          this.autenticacionService.setId(dataMe.id!.toString());
          this.autenticacionService.setNombre(dataMe.nombre!);
          this.autenticacionService.setApellidos(dataMe.apellidos!);
          this.autenticacionService.setEmail(dataMe.email!);
          this.autenticacionService.setAdmin(dataMe.administrador!);
          this.router.navigate(['/biblioteca']);
          this.respuesta = 200;
        });
      }, error => {
        this.respuesta = error.status;
      });
    }
  }
}
