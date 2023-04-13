import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargandoComponent } from './cargando.component';

describe('CargandoComponent', () => {
  let component: CargandoComponent;
  let fixture: ComponentFixture<CargandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
