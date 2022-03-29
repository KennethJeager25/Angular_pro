import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actua-libro',
  templateUrl: './actua-libro.component.html',
  styleUrls: ['./actua-libro.component.css']
})
export class ActuaLibroComponent implements OnInit {

  public FormLibro!:FormGroup;
  public libro!:Libro;
  public libros!:Libro;
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
    private libroserve:LibroService,
    private routerPara:ActivatedRoute,
    private location:Location,
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
      this.FormLibro.get('stock')?.invalid && this.FormLibro.get('stock')?.touched
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
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.libroserve.getLibro(id).subscribe(data =>{
      console.log(data[0].stock);
      this.FormLibro.setValue({
        titulo:data[0].titulo,
        sinopsis:data[0].sinopsis,
        portada:data[0].portada,
        stock:data[0].stock,
        editorial:data[0].id,
        categoria:data[0].id,
        autor:data[0].id,
        ubicacion:data[0].id,
      });
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
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setLibro();
    Swal.fire({
      title: 'Guardar cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        const id = Number(this.routerPara.snapshot.paramMap.get('id'));
        this.libroserve.update(this.FormLibro.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
