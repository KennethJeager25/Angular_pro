import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autores, AutoresUpdate } from 'src/app/models/autores';
import { AutoresService } from 'src/app/services/autores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-autor',
  templateUrl: './mostrar-autor.component.html',
  styleUrls: ['./mostrar-autor.component.css']
})
export class MostrarAutorComponent implements OnInit {

  public FormAutor!:FormGroup;
  public autor!:AutoresUpdate;
  public autores!:Autores[];

  constructor(
    private serve:AutoresService,
    private fb:FormBuilder,
    private rutas:Router,
  ) { }

  ngOnInit(): void {
    this.FormAutor = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getAutores();
  }
  get nombreValidate(){
    return(
      this.FormAutor.get('nombre')?.invalid && this.FormAutor.get('nombre')?.touched
    );
  }

  setAutores():void{
    this.autor = {
      nombre: this.FormAutor.get('nombre')?.value,
    }
  }

  getAutores():void{
    this.serve.mostrarAutores().subscribe(data =>{
      this.autores = data;
    })
  }

  add():void{
    this.setAutores();
    this.serve.add(this.FormAutor.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Autor Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getAutores();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }

  delete(autor:Autores):void{
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
        this.autores = this.autores.filter(h => h !== autor);
        this.serve.delete(autor.id).subscribe();
      }
    });
  }
}