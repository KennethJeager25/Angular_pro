import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estante, Estantes } from 'src/app/models/estante';
import { EstanteService } from 'src/app/services/estante.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estante',
  templateUrl: './estante.component.html',
  styleUrls: ['./estante.component.css']
})
export class EstanteComponent implements OnInit {

  public FormEstante!:FormGroup;
  public estante!:Estante;
  public estantes!:Estantes[];

  constructor( 
    private serve:EstanteService,
    private fb:FormBuilder,
    private rutas:Router,) { }

  ngOnInit(): void {
    this.FormEstante = this.fb.group({
      estante:['',[Validators.required]],
    });
    this.getEstantes();
  }
  get nombreValidate(){
    return(
      this.FormEstante.get('estante')?.invalid && this.FormEstante.get('estante')?.touched
    );
  }
  setEstante():void{
    this.estante = {
      estante: this.FormEstante.get('estante')?.value,
    }
  }

  getEstantes():void{
    this.serve.mostrarEstantes().subscribe(data =>{
      this.estantes = data;
    })
  }

  add():void{
    this.setEstante();
    this.serve.add(this.FormEstante.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estante Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getEstantes();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }

  delete(estante:Estantes):void{
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
        this.estantes = this.estantes.filter(h => h !== estante);
        this.serve.delete(estante.id).subscribe();
      }
    });
  }
}
