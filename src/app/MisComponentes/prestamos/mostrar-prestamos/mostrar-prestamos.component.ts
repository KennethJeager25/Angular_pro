import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { Location } from '@angular/common';
import { Presta, Prestamos } from 'src/app/models/prestamo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-prestamos',
  templateUrl: './mostrar-prestamos.component.html',
  styleUrls: ['./mostrar-prestamos.component.css']
})
export class MostrarPrestamosComponent implements OnInit {

  prestamos!:Prestamos[];

  constructor(
    private serve:PrestamoService,
    private serveUsuario:AuthService,
    private routerPara:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.getPrestamos();
  }
  delete(prestamo:Prestamos):void{
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
        this.prestamos = this.prestamos.filter(h => h !== prestamo);
        this.serve.delete(prestamo.id).subscribe();
      }
    });
  }

  getPrestamos():void{
    this.serve.mostrarPrestamos().subscribe(data =>{
      console.log(data)
      this.prestamos = data
    })
  }

}
