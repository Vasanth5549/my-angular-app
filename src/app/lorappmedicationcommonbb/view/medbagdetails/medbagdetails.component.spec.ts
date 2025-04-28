import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedbagdetailsComponent } from './medbagdetails.component';

describe('MedbagdetailsComponent', () => {
  let component: MedbagdetailsComponent;
  let fixture: ComponentFixture<MedbagdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedbagdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedbagdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
