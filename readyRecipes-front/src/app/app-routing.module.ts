import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { BibliotecaComponent } from './views/biblioteca/biblioteca.component';
import { RecetaComponent } from './views/receta/receta.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { RecuperarComponent } from './views/recuperar/recuperar.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "recuperar", component: RecuperarComponent},
  {path: "registro", component: RegistroComponent},
  {path: "biblioteca", component: BibliotecaComponent},
  {path: "receta", component: RecetaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
