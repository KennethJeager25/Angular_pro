import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Pasillos } from '../models/pasillo';

@Injectable({
  providedIn: 'root'
})
export class PasilloService {

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

  mostrarPasillos():Observable<Pasillos[]>{

    return this.http.get<Pasillos[]>(`${this.apiURL}/pasillo/show`).pipe(
      catchError(this.handleError<Pasillos[]>('getPasillo', []))
    );

  }

  getPasillo(id:number):Observable<Pasillos[]>{
    const url=`${this.apiURL}/Bpasillo/${id}`;
    return this.http.get<Pasillos[]>(url);
  }

  add(pasillo:Pasillos):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/pasillo`,pasillo,{headers})
  }

  delete(id:number):Observable<Pasillos>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/pasillo/${id}`;
    return this.http.delete<Pasillos>(url,{headers})
  }

  update(pasillo:Pasillos,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/pasillo/${id}`;
    return this.http.put(url,pasillo,{headers});
  }
}