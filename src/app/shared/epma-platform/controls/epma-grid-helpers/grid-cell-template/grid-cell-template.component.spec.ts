import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellTemplateComponent } from './grid-cell-template.component';

describe('GridCellTemplateComponent', () => {
  let component: GridCellTemplateComponent;
  let fixture: ComponentFixture<GridCellTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCellTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
