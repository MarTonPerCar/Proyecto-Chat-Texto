import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSelectorComponentComponent } from './request-selector-component.component';

describe('RequestSelectorComponentComponent', () => {
  let component: RequestSelectorComponentComponent;
  let fixture: ComponentFixture<RequestSelectorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSelectorComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSelectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
