import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineUIContainer } from './epma-inline-uicontainer.component';

describe('InlineUIContainer', () => {
  let component: InlineUIContainer;
  let fixture: ComponentFixture<InlineUIContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineUIContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineUIContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
