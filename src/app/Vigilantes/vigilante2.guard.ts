import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Vigilante2Guard implements CanActivate {

  constructor(
    private galleta:CookieService,
    private rutas:Router,
  ){}
  redirect(flag:boolean):any{
    if(flag == false){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NECESITAS INICAR SESION',
      });
      this.rutas.navigate(['/','login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.galleta.check('token');
    this.redirect(cookie);
    return cookie;
  }
  
}
