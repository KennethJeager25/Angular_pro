import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/models/estante';

@Component({
  selector: 'app-actua-estante',
  templateUrl: './actua-estante.component.html',
  styleUrls: ['./actua-estante.component.css']
})
export class ActuaEstanteComponent implements OnInit {

  public estante!:Estante;
  public FormEstante!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:EstanteService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.FormEstante = this.fb.group({
      estante:['',[Validators.required]],
    });
    this.getEstante();
  }
  get nombreValidate(){
    return(
      this.FormEstante.get('estante')?.invalid && this.FormEstante.get('estante')?.touched
    );
  }
  getEstante():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getEstante(id).subscribe(data =>{
      this.FormEstante.setValue({
        estante:data[0].estante,
      });
    });
  }
  setEstante():void{
    this.estante = {
      estante: this.FormEstante.get('estante')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setEstante();
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
        this.serve.update(this.FormEstante.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
