import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRiesgoComponent } from './datos-riesgo.component';

describe('DatosRiesgoComponent', () => {
  let component: DatosRiesgoComponent;
  let fixture: ComponentFixture<DatosRiesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
