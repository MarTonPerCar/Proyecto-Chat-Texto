import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageComponentComponent } from './app-page-component.component';

describe('AppPageComponentComponent', () => {
  let component: AppPageComponentComponent;
  let fixture: ComponentFixture<AppPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
