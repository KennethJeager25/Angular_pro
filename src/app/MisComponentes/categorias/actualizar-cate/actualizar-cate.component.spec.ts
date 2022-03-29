import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCateComponent } from './actualizar-cate.component';

describe('ActualizarCateComponent', () => {
  let component: ActualizarCateComponent;
  let fixture: ComponentFixture<ActualizarCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
