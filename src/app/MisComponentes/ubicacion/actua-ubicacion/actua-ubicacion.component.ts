import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Estantes } from 'src/app/models/estante';
import { Pasillos } from 'src/app/models/pasillo';
import { Ubicacion, Ubicaciones } from 'src/app/models/ubicacion';
import { EstanteService } from 'src/app/services/estante.service';
import { PasilloService } from 'src/app/services/pasillo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actua-ubicacion',
  templateUrl: './actua-ubicacion.component.html',
  styleUrls: ['./actua-ubicacion.component.css']
})
export class ActuaUbicacionComponent implements OnInit {

  public FormUbicacion!:FormGroup;
  public ubicacion!:Ubicacion;
  public pasillos!:Pasillos[];
  public estantes!:Estantes[];

  constructor(
    private serve:UbicacionService,
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private location:Location,
    private estnateSer:EstanteService,
    private pasilloSer:PasilloService,
  ) { }

  ngOnInit(): void {
    this.getPasillos();
    this.getEstantes();
    this.getUbicacion();
    this.FormUbicacion = this.fb.group({
      pasillo:['',[Validators.required]],
      estante:['',[Validators.required]],
    });
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
  getUbicacion():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getUbicacion(id).subscribe(data =>{
      console.log(data);
      this.FormUbicacion.setValue({
        pasillo:data[0].pasillo,
        estante:data[0].id
      });
    });
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
  setPasillos():void{
    this.ubicacion = {
      pasillo:this.FormUbicacion.get('pasillo')?.value,
      estante:this.FormUbicacion.get('estante')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setPasillos();
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
        this.serve.update(this.FormUbicacion.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
