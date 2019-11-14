import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapfreComponent } from './mapfre.component';

describe('MapfreComponent', () => {
  let component: MapfreComponent;
  let fixture: ComponentFixture<MapfreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapfreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
