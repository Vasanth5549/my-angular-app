import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfusionCellComponent } from './infusion-cell.component';

describe('InfusionCellComponent', () => {
  let component: InfusionCellComponent;
  let fixture: ComponentFixture<InfusionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfusionCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfusionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
