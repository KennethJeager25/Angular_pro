import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoresUpdate } from 'src/app/models/autores';
import { AutoresService } from 'src/app/services/autores.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-autor',
  templateUrl: './actualiza-autor.component.html',
  styleUrls: ['./actualiza-autor.component.css']
})
export class ActualizaAutorComponent implements OnInit {

  public autor!:AutoresUpdate;
  public autorForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private routerPara:ActivatedRoute,
    private serve:AutoresService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.autorForm = this.fb.group({
      nombre:['',[Validators.required]],
    });
    this.getAutor();
  }
  get nombreValidate(){
    return(
      this.autorForm.get('nombre')?.invalid && this.autorForm.get('nombre')?.touched
    );
  }
  getAutor():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getAutor(id).subscribe(data =>{
      this.autorForm.setValue({
        nombre:data[0].nombre,
      });
    });
  }
  setAutores():void{
    this.autor = {
      nombre: this.autorForm.get('nombre')?.value,
    }
  }
  goBack(): void {
    this.location.back();
  }

  update():void{
    this.setAutores();
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
        this.serve.update(this.autorForm.value,id).subscribe(() => this.goBack());
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }
}

