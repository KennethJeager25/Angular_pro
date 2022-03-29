import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class Vigilante1Guard implements CanActivate {

  constructor(
    private galleta:CookieService,
    private rutas:Router,
    private roles:AuthService,
  ){}

  redirect(flag:boolean):any{
    if(flag == false){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NO ERES ADMIN',
      });
      this.rutas.navigate(['/','inicio']);
    }
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.galleta.check('token');
    this.roles.getrol().subscribe(data =>{
      this.redirect(data);
    });
    return cookie;
  }
  
}
