import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genero, Generos } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  public FormGenero!:FormGroup;
  public genero!:Genero;
  public generos!:Generos[];

  constructor( 
    private serve:GeneroService,
    private fb:FormBuilder,
    private rutas:Router,) { }

  ngOnInit(): void {
    this.FormGenero = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getGeneros();
  }
  get nombreValidate(){
    return(
      this.FormGenero.get('nombre')?.invalid && this.FormGenero.get('nombre')?.touched
    );
  }
  setGeneros():void{
    this.genero = {
      nombre: this.FormGenero.get('nombre')?.value,
    }
  }

  getGeneros():void{
    this.serve.mostrarGeneros().subscribe(data =>{
      this.generos = data;
    })
  }

  add():void{
    this.setGeneros();
    this.serve.add(this.FormGenero.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Genero Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getGeneros();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }

  delete(genero:Generos):void{
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.generos = this.generos.filter(h => h !== genero);
        this.serve.delete(genero.id).subscribe();
      }
    });
  }


}
