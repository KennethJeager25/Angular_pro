import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActuaUserComponent } from './MisComponentes/auth/actua-user/actua-user.component';
import { LoginComponent } from './MisComponentes/auth/login/login.component';
import { RegistroComponent } from './MisComponentes/auth/registro/registro.component';
import { UsersComponent } from './MisComponentes/auth/users/users.component';
import { ActualizaAutorComponent } from './MisComponentes/Autores/actualiza-autor/actualiza-autor.component';
import { MostrarAutorComponent } from './MisComponentes/Autores/mostrar-autor/mostrar-autor.component';
import { ActualizarCateComponent } from './MisComponentes/categorias/actualizar-cate/actualizar-cate.component';
import { MostrarCateComponent } from './MisComponentes/categorias/mostrar-cate/mostrar-cate.component';
import { ActuaEditorialComponent } from './MisComponentes/editorial/actua-editorial/actua-editorial.component';
import { EditorialComponent } from './MisComponentes/editorial/editorial/editorial.component';
import { ActuaEstanteComponent } from './MisComponentes/estante/actua-estante/actua-estante.component';
import { EstanteComponent } from './MisComponentes/estante/estante/estante.component';
import { ActuaGeneroComponent } from './MisComponentes/genero/actua-genero/actua-genero.component';
import { GeneroComponent } from './MisComponentes/genero/genero/genero.component';
import { ActuaLibroComponent } from './MisComponentes/libro/actua-libro/actua-libro.component';
import { DetalleLibroComponent } from './MisComponentes/libro/detalle-libro/detalle-libro.component';
import { LibroComponent } from './MisComponentes/libro/libro/libro.component';
import { InicioComponent } from './MisComponentes/main/inicio/inicio.component';
import { ActuaPasilloComponent } from './MisComponentes/pasillo/actua-pasillo/actua-pasillo.component';
import { PasilloComponent } from './MisComponentes/pasillo/pasillo/pasillo.component';
import { ActuaEstadoComponent } from './MisComponentes/prestamos/actua-estado/actua-estado.component';
import { MostrarPrestaUserComponent } from './MisComponentes/prestamos/mostrar-presta-user/mostrar-presta-user.component';
import { MostrarPrestamosComponent } from './MisComponentes/prestamos/mostrar-prestamos/mostrar-prestamos.component';
import { ActuaUbicacionComponent } from './MisComponentes/ubicacion/actua-ubicacion/actua-ubicacion.component';
import { UbicacionComponent } from './MisComponentes/ubicacion/ubicacion/ubicacion.component';
import { Vigilante1Guard } from './Vigilantes/vigilante1.guard';
import { Vigilante2Guard } from './Vigilantes/vigilante2.guard';

const routes: Routes = [
  //RUTAS A LAS QUE SOLO PUEDE ACCEDER EL ADMIN//
  {path:"mosCatego", component:MostrarCateComponent,canActivate:[Vigilante1Guard]},
  {path:"actuacate/:id",component:ActualizarCateComponent,canActivate:[Vigilante1Guard]},
  {path:"autores",component:MostrarAutorComponent,canActivate:[Vigilante1Guard]},
  {path:"actuaAutor/:id",component:ActualizaAutorComponent,canActivate:[Vigilante1Guard]},
  {path:"editorial",component:EditorialComponent,canActivate:[Vigilante1Guard]},
  {path:"actuaEditorial/:id",component:ActuaEditorialComponent,canActivate:[Vigilante1Guard]},
  {path:"genero",component:GeneroComponent,canActivate:[Vigilante1Guard]},
  {path:"actugenero/:id",component:ActuaGeneroComponent,canActivate:[Vigilante1Guard]},
  {path:"estante",component:EstanteComponent,canActivate:[Vigilante1Guard]},
  {path:"actuestante/:id",component:ActuaEstanteComponent,canActivate:[Vigilante1Guard]},
  {path:"pasillos",component:PasilloComponent,canActivate:[Vigilante1Guard]},
  {path:"actuapasillos/:id",component:ActuaPasilloComponent,canActivate:[Vigilante1Guard]},
  {path:"ubicaciones",component:UbicacionComponent,canActivate:[Vigilante1Guard]},
  {path:"actuaubicacion/:id",component:ActuaUbicacionComponent,canActivate:[Vigilante1Guard]},
  {path:"libros",component:LibroComponent,canActivate:[Vigilante1Guard]},
  {path:"actualibro/:id",component:ActuaLibroComponent,canActivate:[Vigilante1Guard]},
  {path:"mosUser",component:UsersComponent,canActivate:[Vigilante1Guard]},
  {path:"prestamos",component:MostrarPrestamosComponent,canActivate:[Vigilante1Guard]},
  {path:"actuaestado/:id/:libro",component:ActuaEstadoComponent,canActivate:[Vigilante1Guard]},
  {path:"actuaUser/:id",component:ActuaUserComponent,canActivate:[Vigilante1Guard]},
  //RUTAS SIN INICIO DE SESION
  {path:"login", component: LoginComponent},
  {path:"registraUsu", component: RegistroComponent},
  {path:"inicio", component: InicioComponent},
    //RUTAS CON INICIO DE SESION
  {path:"prestamoUser", component:MostrarPrestaUserComponent,canActivate:[Vigilante2Guard]},
  {path:"detallelibro/:id",component:DetalleLibroComponent,canActivate:[Vigilante2Guard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }