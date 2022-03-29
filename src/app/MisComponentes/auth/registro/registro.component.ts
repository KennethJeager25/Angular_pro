import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registerFrom!:FormGroup;
  public user!:User;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private rutas:Router

    ) {}

    //INICAR VALIDACIONES EN EL FORMULARIO
  ngOnInit(): void {
    this.registerFrom = this.fb.group({

      nombre:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
  
    })
  }
  register(): void{
    //LLAMAR METODO QUE TRAERA LOS DATOS DEL FORMULARIO
    this.setUser();
    this.authService.register(this.registerFrom.value).subscribe((data: any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Registrado',
        showConfirmButton: false,
        timer: 1500
      });
      this.rutas.navigate(['/inicioCli']);
    },error =>
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar',
      })
    });
  }
  //METODO PARA VALIDAR LOS VALORES QUE INTROPDUCES EN EL FORMULARIO
  setUser():void{

    this.user = {
      nombre: this.registerFrom.get('nombre')?.value,
      email:this.registerFrom.get('email')?.value,
      password:this.registerFrom.get('password')?.value
    };
  }
}
