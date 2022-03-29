import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PasilloService } from 'src/app/services/pasillo.service';
import { Pasillo } from 'src/app/models/pasillo';

@Component({
  selector: 'app-actua-pasillo',
  templateUrl: './actua-pasillo.component.html',
  styleUrls: ['./actua-pasillo.component.css']
})
export class ActuaPasilloComponent implements OnInit {

  public pasillo!:Pasillo;
  public FormPasillo!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:PasilloService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.FormPasillo = this.fb.group({
      pasillo:['',[Validators.required]],
    });
    this.getPasillo();
  }
  get nombreValidate(){
    return(
      this.FormPasillo.get('pasillo')?.invalid && this.FormPasillo.get('pasillo')?.touched
    );
  }
  getPasillo():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getPasillo(id).subscribe(data =>{
      this.FormPasillo.setValue({
        pasillo:data[0].pasillo,
      });
    });
  }
  setPasillo():void{
    this.pasillo = {
      pasillo: this.FormPasillo.get('pasillo')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setPasillo();
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
        this.serve.update(this.FormPasillo.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
