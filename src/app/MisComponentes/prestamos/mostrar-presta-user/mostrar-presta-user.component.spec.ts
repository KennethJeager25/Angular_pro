import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPrestaUserComponent } from './mostrar-presta-user.component';

describe('MostrarPrestaUserComponent', () => {
  let component: MostrarPrestaUserComponent;
  let fixture: ComponentFixture<MostrarPrestaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPrestaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPrestaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
