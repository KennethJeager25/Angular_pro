import { Component, OnInit } from '@angular/core';
import { Presta, Prestamos } from 'src/app/models/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mostrar-presta-user',
  templateUrl: './mostrar-presta-user.component.html',
  styleUrls: ['./mostrar-presta-user.component.css']
})
export class MostrarPrestaUserComponent implements OnInit {

  prestamos!:Presta[];
  estado!:boolean;
  FormActu!:FormGroup;


  constructor(
    private serve:PrestamoService,
    private serveUsuario:AuthService,
    private routerPara:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos():void{
    this.serveUsuario.getUser().subscribe(data =>{
      console.log(data);
      this.serve.getPrestamoUser(data).subscribe(data1 =>{
        console.log(data1);
        this.prestamos = data1;
        for (let index = 0; index < data1.length; index++) {
          const id = data1[index].id;
          console.log(id)
        }

      })
    })
  }

  updateEstado(id:number):void{
    this.serve.updateEstado(id).subscribe();
  }

}
