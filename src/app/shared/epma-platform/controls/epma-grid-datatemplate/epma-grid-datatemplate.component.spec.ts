import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmaGridDatatemplateComponent } from './epma-grid-datatemplate.component';

describe('EpmaGridDatatemplateComponent', () => {
  let component: EpmaGridDatatemplateComponent;
  let fixture: ComponentFixture<EpmaGridDatatemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmaGridDatatemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmaGridDatatemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
