import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponentComponent } from './request-component.component';

describe('RequestComponentComponent', () => {
  let component: RequestComponentComponent;
  let fixture: ComponentFixture<RequestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
