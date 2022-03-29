import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { GeneroService } from 'src/app/services/genero.service';
import {interval, timer} from 'rxjs'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() dataEntrante!:number;
  rol!:number;


  constructor(
    private serve:AuthService,
    private router:Router,
    private galleta:CookieService,
    private catego:CategoriasService,
    private gene:GeneroService
  ) { }

  ngOnInit(): void {
    const contador = interval(1000)
    contador.subscribe(() =>{
      const cookie = this.galleta.check("token");
      if(cookie == true){
      this.getRol();
      }
      else{
      }
    })
  }

  getRol():void{
      this.serve.getrol().subscribe((data: any) =>{
        switch(data){
          case true:
            this.rol = 1;
            break;
          case false:
            this.rol = 2;
            break;
          default:
            this.rol = 0;
            break;
        }
      },catchError =>
      {
        console.log(catchError);
      });
  }
  cerrar():void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'ADIOS',
      showConfirmButton: false,
      timer: 1500
    });
    this.galleta.delete('token');
    this.router.navigate(['/inicio']);
    this.rol = 0;
  }
}