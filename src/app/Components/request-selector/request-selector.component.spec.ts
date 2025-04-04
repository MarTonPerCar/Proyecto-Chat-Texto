import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSelectorComponent } from './request-selector.component';

describe('RequestSelectorComponent', () => {
  let component: RequestSelectorComponent;
  let fixture: ComponentFixture<RequestSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
