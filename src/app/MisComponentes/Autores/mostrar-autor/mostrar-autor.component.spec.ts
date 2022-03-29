import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAutorComponent } from './mostrar-autor.component';

describe('MostrarAutorComponent', () => {
  let component: MostrarAutorComponent;
  let fixture: ComponentFixture<MostrarAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
