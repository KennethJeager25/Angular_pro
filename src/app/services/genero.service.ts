import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Generos } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

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

  mostrarGeneros():Observable<Generos[]>{

    return this.http.get<Generos[]>(`${this.apiURL}/genero/show`).pipe(
      catchError(this.handleError<Generos[]>('getGenero', []))
    );

  }

  getGenero(id:number):Observable<Generos[]>{
    const url=`${this.apiURL}/Bgenero/${id}`;
    return this.http.get<Generos[]>(url);
  }

  add(genero:Generos):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/genero`,genero,{headers})
  }

  delete(id:number):Observable<Generos>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/genero/${id}`;
    return this.http.delete<Generos>(url,{headers})
  }

  update(genero:Generos,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/genero/${id}`;
    return this.http.put(url,genero,{headers});
  }

}
