import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias, CategoriasAdd } from 'src/app/models/categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-cate',
  templateUrl: './mostrar-cate.component.html',
  styleUrls: ['./mostrar-cate.component.css']
})
export class MostrarCateComponent implements OnInit {

  public editCategoria!:FormGroup;
  public categoria!:CategoriasAdd;
  public catego!:Categorias[];

  constructor(
    private serve:CategoriasService,
    private fb:FormBuilder,
    private rutas:Router
    ) { }

  ngOnInit(): void {

    this.editCategoria = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getcate();

  }
  get nombreValidate(){
    return(
      this.editCategoria.get('nombre')?.invalid && this.editCategoria.get('nombre')?.touched
    );
  }
  //MOSTRAR CATEGORIAS
  getcate():void{
    this.serve.MostrarCate().subscribe(data =>{
      this.catego=data;
    });
  }
  //METODO AÑADIR
  add():void{
    this.setcategoria();
    this.serve.add(this.editCategoria.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Categoria Registrada',
        showConfirmButton: false,
        timer: 1500
      });
      this.getcate();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }
  setcategoria():void{
    this.categoria = {
      nombre: this.editCategoria.get('nombre')?.value,
    }
  }
 //METODO ELIMINAR

 delete(cate:Categorias):void{
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
      this.catego = this.catego.filter(h => h !== cate);
      this.serve.delete(cate.id).subscribe();
    }
  });
 }





}
