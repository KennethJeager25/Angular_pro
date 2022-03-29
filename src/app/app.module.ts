import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './MisComponentes/auth/login/login.component';
import { RegistroComponent } from './MisComponentes/auth/registro/registro.component';
import { ActualizaAutorComponent } from './MisComponentes/Autores/actualiza-autor/actualiza-autor.component';
import { MostrarAutorComponent } from './MisComponentes/Autores/mostrar-autor/mostrar-autor.component';
import { ActualizarCateComponent } from './MisComponentes/categorias/actualizar-cate/actualizar-cate.component';
import { MostrarCateComponent } from './MisComponentes/categorias/mostrar-cate/mostrar-cate.component';
import { ActuaEditorialComponent } from './MisComponentes/editorial/actua-editorial/actua-editorial.component';
import { EditorialComponent } from './MisComponentes/editorial/editorial/editorial.component';
import { ActuaEstanteComponent } from './MisComponentes/estante/actua-estante/actua-estante.component';
import { EstanteComponent } from './MisComponentes/estante/estante/estante.component';
import { GeneroComponent } from './MisComponentes/genero/genero/genero.component';
import { ActuaGeneroComponent } from './MisComponentes/genero/actua-genero/actua-genero.component';
import { ActuaLibroComponent } from './MisComponentes/libro/actua-libro/actua-libro.component';
import { DetalleLibroComponent } from './MisComponentes/libro/detalle-libro/detalle-libro.component';
import { MostrarLibrosComponent } from './MisComponentes/libro/mostrar-libros/mostrar-libros.component';
import { LibroComponent } from './MisComponentes/libro/libro/libro.component';
import { InicioComponent } from './MisComponentes/main/inicio/inicio.component';
import { NavbarComponent } from './MisComponentes/navbars/navbar/navbar.component';
import { ActuaPasilloComponent } from './MisComponentes/pasillo/actua-pasillo/actua-pasillo.component';
import { PasilloComponent } from './MisComponentes/pasillo/pasillo/pasillo.component';
import { ActuaUbicacionComponent } from './MisComponentes/ubicacion/actua-ubicacion/actua-ubicacion.component';
import { UbicacionComponent } from './MisComponentes/ubicacion/ubicacion/ubicacion.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './MisComponentes/auth/users/users.component';
import { MostrarPrestaUserComponent } from './MisComponentes/prestamos/mostrar-presta-user/mostrar-presta-user.component';
import { MostrarPrestamosComponent } from './MisComponentes/prestamos/mostrar-prestamos/mostrar-prestamos.component';
import { ActuaEstadoComponent } from './MisComponentes/prestamos/actua-estado/actua-estado.component';
import { ActuaUserComponent } from './MisComponentes/auth/actua-user/actua-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ActualizaAutorComponent,
    MostrarAutorComponent,
    ActualizarCateComponent,
    MostrarCateComponent,
    ActuaEditorialComponent,
    EditorialComponent,
    ActuaEstanteComponent,
    EstanteComponent,
    GeneroComponent,
    ActuaGeneroComponent,
    ActuaLibroComponent,
    DetalleLibroComponent,
    MostrarLibrosComponent,
    LibroComponent,
    InicioComponent,
    NavbarComponent,
    ActuaPasilloComponent,
    PasilloComponent,
    ActuaUbicacionComponent,
    UbicacionComponent,
    UsersComponent,
    MostrarPrestaUserComponent,
    MostrarPrestamosComponent,
    ActuaEstadoComponent,
    ActuaUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
