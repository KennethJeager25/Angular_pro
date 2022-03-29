import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-mostrar-libros',
  templateUrl: './mostrar-libros.component.html',
  styleUrls: ['./mostrar-libros.component.css']
})
export class MostrarLibrosComponent implements OnInit {

  public libros!:Libros[];

  constructor(
    private serve:LibroService,
  ) { }

  ngOnInit(): void {
    this.getLibros();
  }
  getLibros():void{
    this.serve.mostrarLibros().subscribe(data =>{
      this.libros = data;
    })
  }

}