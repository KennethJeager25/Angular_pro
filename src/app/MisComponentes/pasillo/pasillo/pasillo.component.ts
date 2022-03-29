import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pasillo, Pasillos } from 'src/app/models/pasillo';
import { PasilloService } from 'src/app/services/pasillo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pasillo',
  templateUrl: './pasillo.component.html',
  styleUrls: ['./pasillo.component.css']
})
export class PasilloComponent implements OnInit {

  public FormPasillo!:FormGroup;
  public pasillo!:Pasillo;
  public pasillos!:Pasillos[];

  constructor( 
    private serve:PasilloService,
    private fb:FormBuilder,
    private rutas:Router,) { }

  ngOnInit(): void {
    this.FormPasillo = this.fb.group({
      pasillo:['',[Validators.required]],
    });
    this.getPasillos();
  }
  get nombreValidate(){
    return(
      this.FormPasillo.get('pasillo')?.invalid && this.FormPasillo.get('pasillo')?.touched
    );
  }
  setPasillos():void{
    this.pasillo = {
      pasillo: this.FormPasillo.get('pasillo')?.value,
    }
  }

  getPasillos():void{
    this.serve.mostrarPasillos().subscribe(data =>{
      this.pasillos = data;
    })
  }

  add():void{
    this.setPasillos();
    this.serve.add(this.FormPasillo.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pasillo Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getPasillos();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar,el registro ya existe',
      });
    });
  }

  delete(pasillo:Pasillos):void{
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
        this.pasillos = this.pasillos.filter(h => h !== pasillo);
        this.serve.delete(pasillo.id).subscribe();
      }
    });
  }

}
