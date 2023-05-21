import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeSelectorComponent } from './price-range-selector.component';

describe('PriceRangeSelectorComponent', () => {
  let component: PriceRangeSelectorComponent;
  let fixture: ComponentFixture<PriceRangeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRangeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
