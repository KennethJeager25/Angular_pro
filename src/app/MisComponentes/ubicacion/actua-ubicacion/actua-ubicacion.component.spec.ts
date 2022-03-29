import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaUbicacionComponent } from './actua-ubicacion.component';

describe('ActuaUbicacionComponent', () => {
  let component: ActuaUbicacionComponent;
  let fixture: ComponentFixture<ActuaUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
