/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EpmaTimeboxComponent } from './epma-timebox.component';

describe('EpmaTimeboxComponent', () => {
  let component: EpmaTimeboxComponent;
  let fixture: ComponentFixture<EpmaTimeboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpmaTimeboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmaTimeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
