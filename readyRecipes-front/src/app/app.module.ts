import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { BibliotecaComponent } from './views/biblioteca/biblioteca.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { RecetaEncontradaComponent } from './components/receta-encontrada/receta-encontrada.component';
import { AplicadorFiltroComponent } from './components/aplicador-filtro/aplicador-filtro.component';
import { RecetaComponent } from './views/receta/receta.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { SafePipeModule } from 'safe-pipe';
import { EstadisticasComponent } from './views/estadisticas/estadisticas.component';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BibliotecaComponent,
    CategoriaComponent,
    RecetaEncontradaComponent,
    AplicadorFiltroComponent,
    RecetaComponent,
    ComentarioComponent,
    LoginComponent,
    RegistroComponent,
    CargandoComponent,
    EstadisticasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SafePipeModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
