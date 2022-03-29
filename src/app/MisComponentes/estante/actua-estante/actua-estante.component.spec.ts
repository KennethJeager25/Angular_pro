import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaEstanteComponent } from './actua-estante.component';

describe('ActuaEstanteComponent', () => {
  let component: ActuaEstanteComponent;
  let fixture: ComponentFixture<ActuaEstanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaEstanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaEstanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
