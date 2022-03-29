import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaEstadoComponent } from './actua-estado.component';

describe('ActuaEstadoComponent', () => {
  let component: ActuaEstadoComponent;
  let fixture: ComponentFixture<ActuaEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
