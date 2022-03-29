import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Userlog } from 'src/app/models/userlog';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  public user!:Userlog;
  rol!:String;

  constructor(
    private fb:FormBuilder,
    private servicio:AuthService,
    private rutas:Router,
    private galleta:CookieService,
    ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
  
    });

  }
  login(): void{
      this.setUser();
      this.servicio.login(this.user).subscribe((data:any) =>{
        this.galleta.set('token',data.token,1,'/');
        localStorage.setItem('token',data.token);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'BIENVENIDO',
          showConfirmButton: false,
          timer: 1500
        });
        this.rutas.navigate(['/inicio']);
      },error =>
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecta',
        });
      });
  }

  get passwordValidate(){
    return(
      this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
    );
  }

  setUser():void{

    this.user = {
      email:this.loginForm.get('email')?.value,
      password:this.loginForm.get('password')?.value
    };

  }



}