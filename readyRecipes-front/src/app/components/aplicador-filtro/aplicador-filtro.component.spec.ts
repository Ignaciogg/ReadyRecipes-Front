import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicadorFiltroComponent } from './aplicador-filtro.component';

describe('AplicadorFiltroComponent', () => {
  let component: AplicadorFiltroComponent;
  let fixture: ComponentFixture<AplicadorFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicadorFiltroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicadorFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
