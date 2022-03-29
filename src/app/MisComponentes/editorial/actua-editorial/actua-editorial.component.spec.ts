import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaEditorialComponent } from './actua-editorial.component';

describe('ActuaEditorialComponent', () => {
  let component: ActuaEditorialComponent;
  let fixture: ComponentFixture<ActuaEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
