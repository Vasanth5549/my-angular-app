import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmaIlistboxComponent } from './epma-ilistbox.component';

describe('EpmaIlistboxComponent', () => {
  let component: EpmaIlistboxComponent;
  let fixture: ComponentFixture<EpmaIlistboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmaIlistboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmaIlistboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
