import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingdetailsComponent } from './buildingdetails.component';

describe('BuildingdetailsComponent', () => {
  let component: BuildingdetailsComponent;
  let fixture: ComponentFixture<BuildingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
