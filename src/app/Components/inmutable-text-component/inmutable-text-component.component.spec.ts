import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmutableTextComponentComponent } from './inmutable-text-component.component';

describe('InmutableTextComponentComponent', () => {
  let component: InmutableTextComponentComponent;
  let fixture: ComponentFixture<InmutableTextComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmutableTextComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmutableTextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
