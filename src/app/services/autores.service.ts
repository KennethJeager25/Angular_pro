import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { Autores } from '../models/autores';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  apiURL = environment.apiURL;

  constructor(
    private http:HttpClient,
    private galeta:CookieService
    ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  log(arg0: string) {
    throw new Error('Method not implemented.');
  }

  mostrarAutores():Observable<Autores[]>{

    return this.http.get<Autores[]>(`${this.apiURL}/autor/show`).pipe(
      catchError(this.handleError<Autores[]>('getAutores', []))
    );
  }

  getAutor(id:number):Observable<Autores[]>{

    const url=`${this.apiURL}/Bautor/${id}`;
    return this.http.get<Autores[]>(url);
  }

  add(autor:Autores):Observable<any>{

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/autor`,autor,{headers})
  }

  delete(id:number):Observable<Autores>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/autor/${id}`;
    return this.http.delete<Autores>(url,{headers});

  }

  update(autor:Autores,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/autor/${id}`;
    return this.http.put(url,autor,{headers});

  }

}
