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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  detalle!:Libros[];
  estado!:boolean;
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
    this.FormPrestamo = this.fb.group({
      libro:["",[Validators.required]],
      cliente:["",[Validators.required]],
    })
    const contador = interval(1000)
    contador.subscribe(() =>{
      this.getStock();
    })
    this.setForm();
  }
  getLibro():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.libro.getLibro(id).subscribe(data =>{
      console.log(data);
      this.detalle = data;
    })
  }
  goBack(): void {
    this.location.back();
  }

  getStock():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.libro.VerStock(id).subscribe(data =>{
      if(data.stock == true){
        this.estado = true;
        this.mensaje='';
      }
      else{
        this.estado = false;
        this.mensaje = "NO HAY LIBROS DISPONIBLES"
      }
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

  setForm():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serveUsuario.getUser().subscribe(data1 =>{
      this.FormPrestamo.setValue({
        libro:id,
        cliente:data1,
      })
    })
  }   
  
  add():void{
    this.servi.add(this.FormPrestamo.value).subscribe((data:any)=>{
      Swal.fire({
        title: 'SE REGISTRO SU PEDIDO, FECHA A ENTREGAR DENTRO DE UNA SEMANA',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.rutas.navigate(['/inicio']);
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar,el registro ya existe',
      });
    });
  }
}