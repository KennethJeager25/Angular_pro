import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaLibroComponent } from './actua-libro.component';

describe('ActuaLibroComponent', () => {
  let component: ActuaLibroComponent;
  let fixture: ComponentFixture<ActuaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
