import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autores } from 'src/app/models/autores';
import { Categorias } from 'src/app/models/categorias';
import { Editorial } from 'src/app/models/editorial';
import { Libro, Libros } from 'src/app/models/libro';
import { Ubicacion, Ubicaciones } from 'src/app/models/ubicacion';
import { AutoresService } from 'src/app/services/autores.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { EstanteService } from 'src/app/services/estante.service';
import { LibroService } from 'src/app/services/libro.service';
import { PasilloService } from 'src/app/services/pasillo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  public FormLibro!:FormGroup;
  public libro!:Libro;
  public libros!:Libros[];
  public editoriales!:Editorial[];
  public categorias!:Categorias[];
  public autores!:Autores[];
  public ubicacion!:Ubicaciones[];

  constructor(
    private serve:LibroService, 
    private ubicaserve:UbicacionService,
    private fb:FormBuilder,
    private rutas:Router,
    private editorialserve:EditorialesService,
    private autorserve:AutoresService,
    private categariaserve:CategoriasService,
    private libroserve:LibroService
  ) { }

  ngOnInit(): void {
    this.getAutor();
    this.getCategoria();
    this.getEditorial();
    this.getLibros();
    this.getUbicacion();
    this.FormLibro = this.fb.group({
      titulo:['',[Validators.required]],
      sinopsis:['',[Validators.required]],
      portada:['',[Validators.required]],
      stock:['',[Validators.required]],
      editorial:['',[Validators.required]],
      categoria:['',[Validators.required]],
      autor:['',[Validators.required]],
      ubicacion:['',[Validators.required]],
    });
  }
  get tituloValidate(){
    return(
      this.FormLibro.get('titulo')?.invalid && this.FormLibro.get('titulo')?.touched
    );
  }
  get sinopsisValidate(){
    return(
      this.FormLibro.get('sinopsis')?.invalid && this.FormLibro.get('sinopsis')?.touched
    );
  }
  get portadaValidate(){
    return(
      this.FormLibro.get('portada')?.invalid && this.FormLibro.get('portada')?.touched
    );
  }
  get stockValidate(){
    return(
      this.FormLibro.get('portada')?.invalid && this.FormLibro.get('portada')?.touched
    );
  }
  get editorialValidate(){
    return(
      this.FormLibro.get('editorial')?.invalid && this.FormLibro.get('editorial')?.touched
    );
  }
  get categoriaValidate(){
    return(
      this.FormLibro.get('categoria')?.invalid && this.FormLibro.get('categoria')?.touched
    );
  }
  get autorValidate(){
    return(
      this.FormLibro.get('autor')?.invalid && this.FormLibro.get('autor')?.touched
    );
  }
  get ubicacionValidate(){
    return(
      this.FormLibro.get('ubicacion')?.invalid && this.FormLibro.get('ubicacion')?.touched
    );
  }
  getEditorial():void{
    this.editorialserve.mostrarEditorales().subscribe(data =>{
      this.editoriales = data;
    })
  }
  getCategoria():void{
    this.categariaserve.MostrarCate().subscribe(data =>{
      this.categorias = data;
    })
  }
  getAutor():void{
    this.autorserve.mostrarAutores().subscribe(data =>{
      this.autores = data;
    })
  }
  getUbicacion():void{
    this.ubicaserve.mostrarUbicaciones().subscribe(data =>{
      this.ubicacion = data;
    })
  }
  getLibros():void{
    this.libroserve.mostrarLibros().subscribe(data =>{
      this.libros = data;
    })
  }
  setLibro():void{
    this.libro= {
      titulo:this.FormLibro.get('titulo')?.value,
      sinopsis:this.FormLibro.get('sinopsis')?.value,
      portada:this.FormLibro.get('portada')?.value,
      stock:this.FormLibro.get('stock')?.value,
      editorial:this.FormLibro.get('editorial')?.value,
      categoria:this.FormLibro.get('categoria')?.value,
      autor:this.FormLibro.get('autor')?.value,
      ubicacion:this.FormLibro.get('ubicacion')?.value,
    }
  }
  add():void{
    this.setLibro();
    this.serve.add(this.FormLibro.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Libro Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.FormLibro.reset();
      this.getLibros();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar,el registro ya existe',
      });
    });
  }
  delete(libro:Libros):void{
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
        this.libros = this.libros.filter(h => h !== libro);
        this.serve.delete(libro.id).subscribe();
      }
    });
  }




}
