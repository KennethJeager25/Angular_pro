import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Prestamos } from '../models/prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
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

  getPrestamoUser(id:number):Observable<Prestamos[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/prestamoUser/${id}`;
    return this.http.get<Prestamos[]>(url,{headers});
  }
  mostrarPrestamos():Observable<any[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/prestamo`;
    return this.http.get<any[]>(url,{headers});
  }
  getPrestamo(id:number):Observable<Prestamos[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/prestamoid/${id}`;
    return this.http.get<Prestamos[]>(url,{headers});
  }
  add(prestamo:Prestamos):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/prestamo`,prestamo,{headers})
  }

  delete(id:number):Observable<Prestamos>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/prestamo/${id}`;
    return this.http.delete<Prestamos>(url,{headers})
  }

  updateEstado(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/prestamoAct/${id}`;
    return this.http.put(url,{headers});
  }
}
