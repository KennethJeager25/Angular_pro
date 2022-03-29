import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Estantes } from '../models/estante';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {

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

  mostrarEstantes():Observable<Estantes[]>{

    return this.http.get<Estantes[]>(`${this.apiURL}/estantes/show`).pipe(
      catchError(this.handleError<Estantes[]>('getEstante', []))
    );

  }

  getEstante(id:number):Observable<Estantes[]>{
    const url=`${this.apiURL}/Bestantes/${id}`;
    return this.http.get<Estantes[]>(url);
  }

  add(Estantes:Estantes):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/estante`,Estantes,{headers})
  }

  delete(id:number):Observable<Estantes>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/estante/${id}`;
    return this.http.delete<Estantes>(url,{headers})
  }

  update(Estantes:Estantes,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/estante/${id}`;
    return this.http.put(url,Estantes,{headers});
  }
}
