import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Ubicaciones } from '../models/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

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

  mostrarUbicaciones():Observable<Ubicaciones[]>{

    return this.http.get<Ubicaciones[]>(`${this.apiURL}/ubicacion/show`).pipe(
      catchError(this.handleError<Ubicaciones[]>('getUbicaciones', []))
    );

  }

  getUbicacion(id:number):Observable<Ubicaciones[]>{
    const url=`${this.apiURL}/Bubicacion/${id}`;
    return this.http.get<Ubicaciones[]>(url);
  }

  add(Ubicaciones:Ubicaciones):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/ubicacion`,Ubicaciones,{headers})
  }

  delete(id:number):Observable<Ubicaciones>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/ubicacion/${id}`;
    return this.http.delete<Ubicaciones>(url,{headers})
  }

  update(Ubicaciones:Ubicaciones,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/ubicacion/${id}`;
    return this.http.put(url,Ubicaciones,{headers});
  }
}
