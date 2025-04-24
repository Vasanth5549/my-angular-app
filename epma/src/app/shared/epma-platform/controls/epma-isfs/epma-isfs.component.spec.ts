import { ComponentFixture, TestBed } from '@angular/core/testing';

import { iSFS } from './epma-isfs.component';

describe('EpmaIsfsComponent', () => {
  let component: iSFS;
  let fixture: ComponentFixture<iSFS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ iSFS ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(iSFS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
