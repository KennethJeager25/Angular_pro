import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaAutorComponent } from './actualiza-autor.component';

describe('ActualizaAutorComponent', () => {
  let component: ActualizaAutorComponent;
  let fixture: ComponentFixture<ActualizaAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
