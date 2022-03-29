import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { Userlog } from '../models/userlog';
import { ResponseInter } from '../models/response-inter'; 
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = environment.apiURL;

  constructor(
    private http:HttpClient,
    private galeta:CookieService
  ) { }
  
  update(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/rolAct/${id}`;
    return this.http.put(url,{headers});
  }
}
