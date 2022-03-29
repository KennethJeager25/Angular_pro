import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { Editoriales } from 'src/app/models/editorial';

@Component({
  selector: 'app-actua-editorial',
  templateUrl: './actua-editorial.component.html',
  styleUrls: ['./actua-editorial.component.css']
})
export class ActuaEditorialComponent implements OnInit {

  public editorial!:Editoriales;
  public FormEditorial!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:EditorialesService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.FormEditorial = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getEditorial();
  }
  get nombreValidate(){
    return(
      this.FormEditorial.get('nombre')?.invalid && this.FormEditorial.get('nombre')?.touched
    );
  }
  getEditorial():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getEditorial(id).subscribe(data =>{
      this.FormEditorial.setValue({
        nombre:data[0].nombre,
      });
    });
  }
  setEditorial():void{
    this.editorial = {
      nombre: this.FormEditorial.get('nombre')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }
  update():void{
    this.setEditorial();
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
        this.serve.update(this.FormEditorial.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}

