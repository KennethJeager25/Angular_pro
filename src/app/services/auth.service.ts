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
export class AuthService {

  apiURL = environment.apiURL;

  constructor(
    private http:HttpClient,
    private galeta:CookieService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  register(user:User):Observable<any>{

    return this.http.post(`${this.apiURL}/usuario/crear`,user);
  }

  login(userlog:Userlog):Observable<ResponseInter>{

    return this.http.post<ResponseInter>(`${this.apiURL}/usuario/login`,userlog);
  }

  getrol():Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.get(`${this.apiURL}/api/admin`,{headers}).pipe(
      catchError(this.handleError('inicio fallido'))
    );
  }
  getUser():Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.get(`${this.apiURL}/api/admin2`,{headers});
  }

  logout():Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/logout`,{headers});
  }
  MostrarUsers():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.apiURL}/usuario/show`).pipe(
      catchError(this.handleError<Usuarios[]>('getUsuarios', []))
    );
  }
  delete(id:number):Observable<Usuarios>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/usuario/${id}`;
    return this.http.delete<Usuarios>(url,{headers});

  }
  update(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/usuarioRol/${id}`;
    return this.http.put(url,{headers});
  }
  getUsuario(id:number):Observable<Usuarios[]>{
    const url=`${this.apiURL}/Busuario/${id}`;
    return this.http.get<Usuarios[]>(url);
  }

}
