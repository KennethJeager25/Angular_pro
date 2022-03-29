import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {  Libro, Libros } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

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
  mostrarLibros():Observable<Libros[]>{

    return this.http.get<Libros[]>(`${this.apiURL}/libro/show`).pipe(
      catchError(this.handleError<Libros[]>('getLibros', []))
    );

  }
  getLibro(id:number):Observable<Libros[]>{
    const url=`${this.apiURL}/bidlibro/${id}`;
    return this.http.get<Libros[]>(url);
  }
  add(Libros:Libros):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/libro`,Libros,{headers})
  }
  delete(id:number):Observable<Libros>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/libro/${id}`;
    return this.http.delete<Libros>(url,{headers})
  }
  update(Libros:Libros,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/libro/${id}`;
    return this.http.put(url,Libros,{headers});
  }

  VerStock(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/libroStock/${id}`;
    return this.http.get(url,{headers});
  }

}

