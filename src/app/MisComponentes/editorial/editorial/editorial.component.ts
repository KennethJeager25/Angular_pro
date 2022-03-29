import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editorial, Editoriales } from 'src/app/models/editorial';
import { EditorialesService } from 'src/app/services/editoriales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  public FormEditrial!:FormGroup;
  public editorial!:Editoriales;
  public editoriales!:Editorial[];


  constructor(
    private serve:EditorialesService,
    private fb:FormBuilder,
    private rutas:Router,
  ) { }

  ngOnInit(): void {
    this.FormEditrial = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getEditoriales();
  }

  get nombreValidate(){
    return(
      this.FormEditrial.get('nombre')?.invalid && this.FormEditrial.get('nombre')?.touched
    );
  }

  setEditoriales():void{
    this.editorial = {
      nombre: this.FormEditrial.get('nombre')?.value,
    }
  }

  getEditoriales():void{
    this.serve.mostrarEditorales().subscribe(data =>{
      this.editoriales = data;
    })
  }

  add():void{
    this.setEditoriales();
    this.serve.add(this.FormEditrial.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Editorial Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getEditoriales();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }

  delete(editorial:Editorial):void{
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
        this.editoriales = this.editoriales.filter(h => h !== editorial);
        this.serve.delete(editorial.id).subscribe();
      }
    });
  }



}

