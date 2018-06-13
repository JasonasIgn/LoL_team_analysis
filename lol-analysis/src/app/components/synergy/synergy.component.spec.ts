import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergyComponent } from './synergy.component';

describe('SynergyComponent', () => {
  let component: SynergyComponent;
  let fixture: ComponentFixture<SynergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
