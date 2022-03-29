import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

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

//CRUD CATEGORIA




  MostrarCate():Observable<Categorias[]>{

    return this.http.get<Categorias[]>(`${this.apiURL}/categoria/show`);
  }
  getcate(id:number):Observable<Categorias[]>{

    const url=`${this.apiURL}/Bcategoria/${id}`;
    return this.http.get<Categorias[]>(url);

  }

  add(cate:Categorias):Observable<any>{

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    return this.http.post(`${this.apiURL}/api/categoria`,cate,{headers});
  }
  delete(id:number):Observable<Categorias>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/categoria/${id}`;
    return this.http.delete<Categorias>(url,{headers});

  }
  update(cate:Categorias,id:number):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.galeta.get('token'))
    const url=`${this.apiURL}/api/categoria/${id}`;
    return this.http.put(url,cate,{headers});
  }

}
