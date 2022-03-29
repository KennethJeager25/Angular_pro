import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCateComponent } from './mostrar-cate.component';

describe('MostrarCateComponent', () => {
  let component: MostrarCateComponent;
  let fixture: ComponentFixture<MostrarCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
