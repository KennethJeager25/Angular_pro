import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaGeneroComponent } from './actua-genero.component';

describe('ActuaGeneroComponent', () => {
  let component: ActuaGeneroComponent;
  let fixture: ComponentFixture<ActuaGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
