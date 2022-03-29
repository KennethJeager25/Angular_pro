import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPrestamosComponent } from './mostrar-prestamos.component';

describe('MostrarPrestamosComponent', () => {
  let component: MostrarPrestamosComponent;
  let fixture: ComponentFixture<MostrarPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPrestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
