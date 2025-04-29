import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrupPageComponent } from './add-grup-page.component';

describe('AddGrupPageComponent', () => {
  let component: AddGrupPageComponent;
  let fixture: ComponentFixture<AddGrupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGrupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
