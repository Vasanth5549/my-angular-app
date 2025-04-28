import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellEditTemplateComponent } from './grid-cell-edit-template.component';

describe('GridCellEditTemplateComponent', () => {
  let component: GridCellEditTemplateComponent;
  let fixture: ComponentFixture<GridCellEditTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCellEditTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCellEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
