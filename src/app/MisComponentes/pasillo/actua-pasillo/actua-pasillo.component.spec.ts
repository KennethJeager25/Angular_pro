import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaPasilloComponent } from './actua-pasillo.component';

describe('ActuaPasilloComponent', () => {
  let component: ActuaPasilloComponent;
  let fixture: ComponentFixture<ActuaPasilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaPasilloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaPasilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
