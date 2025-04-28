import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmaRichtextboxComponent } from './epma-richtextbox.component';

describe('EpmaRichtextboxComponent', () => {
  let component: EpmaRichtextboxComponent;
  let fixture: ComponentFixture<EpmaRichtextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmaRichtextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmaRichtextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
