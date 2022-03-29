import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Editorial } from '../models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

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

  mostrarEditorales():Observable<Editorial[]>{

    return this.http.get<Editorial[]>(`${this.apiURL}/editorial/show`).pipe(
      catchError(this.handleError<Editorial[]>('getEditorial', []))
    );

  }

  getEditorial(id:number):Observable<Editorial[]>{
    const url=`${this.apiURL}/Beditorial/${id}`;
    return this.http.get<Editorial[]>(url);
  }

  add(edito:Editorial):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/editorial`,edito,{headers})
  }

  delete(id:number):Observable<Editorial>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/editorial/${id}`;
    return this.http.delete<Editorial>(url,{headers})
  }

  update(edito:Editorial,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/editorial/${id}`;
    return this.http.put(url,edito,{headers});
  }




}