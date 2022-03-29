import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias, CategoriasAdd } from 'src/app/models/categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-actualizar-cate',
  templateUrl: './actualizar-cate.component.html',
  styleUrls: ['./actualizar-cate.component.css']
})
export class ActualizarCateComponent implements OnInit {

  actualizar!:FormGroup
  public categorias!:CategoriasAdd;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:CategoriasService,
    private location:Location
    ) {}

  ngOnInit(): void {
    this.actualizar = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getCate();
  }
  get nombreValidate(){
    return(
      this.actualizar.get('nombre')?.invalid && this.actualizar.get('nombre')?.touched
    );
  }

    getCate():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getcate(id).subscribe(data =>{
      this.actualizar.setValue({
        nombre:data[0].nombre,
      });
    });
  }

  update():void{
    this.setcategoria();
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
        this.serve.update(this.actualizar.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  setcategoria():void{
    this.categorias = {
      nombre: this.actualizar.get('nombre')?.value,
    }
  }
}
