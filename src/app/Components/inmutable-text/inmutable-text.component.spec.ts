import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmutableTextComponent } from './inmutable-text.component';

describe('InmutableTextComponent', () => {
  let component: InmutableTextComponent;
  let fixture: ComponentFixture<InmutableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmutableTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmutableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
