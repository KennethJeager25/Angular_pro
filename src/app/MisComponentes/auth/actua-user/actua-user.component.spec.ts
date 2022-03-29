import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaUserComponent } from './actua-user.component';

describe('ActuaUserComponent', () => {
  let component: ActuaUserComponent;
  let fixture: ComponentFixture<ActuaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
