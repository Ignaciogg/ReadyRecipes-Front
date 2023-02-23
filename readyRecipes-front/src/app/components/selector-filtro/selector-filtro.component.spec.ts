import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorFiltroComponent } from './selector-filtro.component';

describe('SelectorFiltroComponent', () => {
  let component: SelectorFiltroComponent;
  let fixture: ComponentFixture<SelectorFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorFiltroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
