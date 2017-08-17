import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearDetailComponent } from './gear-detail.component';

describe('GearDetailComponent', () => {
  let component: GearDetailComponent;
  let fixture: ComponentFixture<GearDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
