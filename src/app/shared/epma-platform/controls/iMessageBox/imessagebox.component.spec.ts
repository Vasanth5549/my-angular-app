import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMessageBoxComponent } from './imessagebox.component';

describe('IMessageBoxComponent', () => {
  let component: IMessageBoxComponent;
  let fixture: ComponentFixture<IMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IMessageBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
