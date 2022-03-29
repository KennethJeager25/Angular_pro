import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {interval, timer} from 'rxjs'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-actua-user',
  templateUrl: './actua-user.component.html',
  styleUrls: ['./actua-user.component.css']
})
export class ActuaUserComponent implements OnInit {

  public Usuarios!:Usuarios[];
  public estado!:boolean
  FormUser!:FormGroup;
  rol!:boolean;


  constructor(
    private serve:AuthService,
    private Rolserve:UsersService,
    private location:Location,
    private serveUsuario:AuthService,
    private fb:FormBuilder,//validaciones
    private rutas:Router,
    private routerPara:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getRol();
    this.FormUser = this.fb.group({
      libro:["",[Validators.required]],
      cliente:["",[Validators.required]],
    })
    const contador = interval(1000)
    contador.subscribe(() =>{
      this.getRol();
    })
  }
  get libroValidate(){
    return(
      this.FormUser.get('libro')?.invalid && this.FormUser.get('libro')?.touched
    );
  }
  get clienteValidate(){
    return(
      this.FormUser.get('cliente')?.invalid && this.FormUser.get('cliente')?.touched
    );
  }

  getUser():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getUsuario(id).subscribe(data =>{
      this.Usuarios = data
    })
  }
  goBack(): void {
    this.location.back();
  }
  getRol():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.serve.getUsuario(id).subscribe(data =>{
      console.log(data)
      if(data[0].rol == 1){
        this.rol = true
      }
      else{
        this.rol = false
      }
    })
  }

  update():void{
    const id = Number(this.routerPara.snapshot.paramMap.get('id'));
    this.Rolserve.update(id).subscribe(data =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'ROL ACTUALIZADO',
        showConfirmButton: false,
        timer: 1500
      });
      this.rutas.navigate(['/mosUser']);
    })
  }


}
