import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Run } from './epma-run.component';

describe('Run', () => {
  let component: Run;
  let fixture: ComponentFixture<Run>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Run ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Run);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
