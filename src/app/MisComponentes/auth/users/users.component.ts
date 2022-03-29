import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public Usuarios!:Usuarios[];
  public estado!:boolean

  constructor(
    private serve:AuthService,
    private Rolserve:UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void{
    this.serve.MostrarUsers().subscribe(data =>{
      console.log(data);
      this.Usuarios = data;
    });
  }
  delete(user:Usuarios):void{
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.Usuarios = this.Usuarios.filter(h => h !== user);
        this.serve.delete(user.id).subscribe();
      }
    });
  }
}
