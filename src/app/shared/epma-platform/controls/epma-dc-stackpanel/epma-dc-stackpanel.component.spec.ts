import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmaDcStackpanelComponent } from './epma-dc-stackpanel.component';

describe('EpmaDcStackpanelComponent', () => {
  let component: EpmaDcStackpanelComponent;
  let fixture: ComponentFixture<EpmaDcStackpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmaDcStackpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmaDcStackpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
