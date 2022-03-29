import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-actua-genero',
  templateUrl: './actua-genero.component.html',
  styleUrls: ['./actua-genero.component.css']
})
export class ActuaGeneroComponent implements OnInit {

  public genero!:Genero;
  public FormGenero!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:GeneroService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.FormGenero = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getGenero();
  }
  get nombreValidate(){
    return(
      this.FormGenero.get('nombre')?.invalid && this.FormGenero.get('nombre')?.touched
    );
  }
  getGenero():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getGenero(id).subscribe(data =>{
      this.FormGenero.setValue({
        nombre:data[0].nombre,
      });
    });
  }
  setGenero():void{
    this.genero = {
      nombre: this.FormGenero.get('nombre')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setGenero();
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
        this.serve.update(this.FormGenero.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
