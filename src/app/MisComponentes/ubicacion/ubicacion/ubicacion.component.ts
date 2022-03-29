import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estantes } from 'src/app/models/estante';
import { Pasillos } from 'src/app/models/pasillo';
import { Ubicacion, Ubicaciones } from 'src/app/models/ubicacion';
import { EstanteService } from 'src/app/services/estante.service';
import { PasilloService } from 'src/app/services/pasillo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  public FormUbicacion!:FormGroup;
  public ubicacion!:Ubicacion;
  public pasillos!:Pasillos[];
  public estantes!:Estantes[];
  public ubicaciones!:Ubicaciones[];

  constructor(
    private serve:UbicacionService,
    private fb:FormBuilder,
    private rutas:Router,
    public estnateSer:EstanteService,
    public pasilloSer:PasilloService,
  ) { }

  ngOnInit(): void {
    this.getPasillos();
    this.getEstantes();
    this.getUbicaciones();
    this.FormUbicacion = this.fb.group({
      pasillo:['',[Validators.required]],
      estante:['',[Validators.required]],
    });
    this.getPasillos();
  }
  get pasilloValidate(){
    return(
      this.FormUbicacion.get('pasillo')?.invalid && this.FormUbicacion.get('pasillo')?.touched
    );
  }
  get estanteValidate(){
    return(
      this.FormUbicacion.get('estante')?.invalid && this.FormUbicacion.get('estante')?.touched
    );
  }
  getPasillos():void{
    this.pasilloSer.mostrarPasillos().subscribe(data =>{
      this.pasillos = data;
    })
  }
  getEstantes():void{
    this.estnateSer.mostrarEstantes().subscribe(data =>{
      this.estantes = data;
    })
  }
  getUbicaciones():void{
    this.serve.mostrarUbicaciones().subscribe(data =>{
      this.ubicaciones = data;
    })
  }
  setPasillos():void{
    this.ubicacion = {
      pasillo:this.FormUbicacion.get('pasillo')?.value,
      estante:this.FormUbicacion.get('estante')?.value,
    }
  }
  add():void{
    this.setPasillos();
    this.serve.add(this.FormUbicacion.value).subscribe((data:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ubicacion Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.getUbicaciones();
      this.FormUbicacion.reset();
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      });
    });
  }

  delete(ubicacion:Ubicaciones):void{
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
        this.ubicaciones = this.ubicaciones.filter(h => h !== ubicacion);
        this.serve.delete(ubicacion.id).subscribe();
      }
    });
  }

}
