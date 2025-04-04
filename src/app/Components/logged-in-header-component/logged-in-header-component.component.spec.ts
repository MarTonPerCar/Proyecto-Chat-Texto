import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInHeaderComponentComponent } from './logged-in-header-component.component';

describe('LoggedInHeaderComponentComponent', () => {
  let component: LoggedInHeaderComponentComponent;
  let fixture: ComponentFixture<LoggedInHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInHeaderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
