import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { BibliotecaComponent } from './views/biblioteca/biblioteca.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { RecetaEncontradaComponent } from './components/receta-encontrada/receta-encontrada.component';
import { AplicadorFiltroComponent } from './components/aplicador-filtro/aplicador-filtro.component';
import { RecetaComponent } from './views/receta/receta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BibliotecaComponent,
    CategoriaComponent,
    RecetaEncontradaComponent,
    AplicadorFiltroComponent,
    RecetaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
