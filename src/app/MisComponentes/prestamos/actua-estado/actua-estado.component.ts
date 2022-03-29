import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Libros } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import {interval, timer} from 'rxjs'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Prestamos } from 'src/app/models/prestamo';

@Component({
  selector: 'app-actua-estado',
  templateUrl: './actua-estado.component.html',
  styleUrls: ['./actua-estado.component.css']
})
export class ActuaEstadoComponent implements OnInit {

  detalle!:Libros[];
  estado!:boolean;
  prestamo!:Prestamos[];
  mensaje!:string;
  FormPrestamo!:FormGroup;

  constructor(
    private libro:LibroService,
    private routerPara:ActivatedRoute,
    private location:Location,
    private serveUsuario:AuthService,
    private servi:PrestamoService,
    private fb:FormBuilder,//validaciones
    private rutas:Router,
  ) { }

  ngOnInit(): void {
    this.getLibro();
    this.getEstado();
    this.FormPrestamo = this.fb.group({
      libro:["",[Validators.required]],
      cliente:["",[Validators.required]],
    })
    const contador = interval(1000)
    contador.subscribe(() =>{
      this.getEstado();
    })
  }
  get libroValidate(){
    return(
      this.FormPrestamo.get('libro')?.invalid && this.FormPrestamo.get('libro')?.touched
    );
  }
  get clienteValidate(){
    return(
      this.FormPrestamo.get('cliente')?.invalid && this.FormPrestamo.get('cliente')?.touched
    );
  }

  getLibro():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('libro'));
    this.libro.getLibro(id).subscribe(data =>{
      this.detalle = data;
    })
  }
  goBack(): void {
    this.location.back();
  }
  getEstado():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.servi.getPrestamo(id).subscribe(data =>{
      if(data[0].Entregado == 'NO'){
        this.estado = true;
        this.mensaje =""
      }
      else{
        this.estado = false;
        this.mensaje = "LIBRO ENTREGADO"
      }
    })
  }

  update():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.servi.updateEstado(id).subscribe(data =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Libro Entregado',
        showConfirmButton: false,
        timer: 1500
      });
      this.rutas.navigate(['/prestamos'])
    });
  }

}
