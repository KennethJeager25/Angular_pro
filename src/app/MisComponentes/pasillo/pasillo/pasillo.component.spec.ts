import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasilloComponent } from './pasillo.component';

describe('PasilloComponent', () => {
  let component: PasilloComponent;
  let fixture: ComponentFixture<PasilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasilloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
