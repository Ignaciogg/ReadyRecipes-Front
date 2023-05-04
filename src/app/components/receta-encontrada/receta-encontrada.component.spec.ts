import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEncontradaComponent } from './receta-encontrada.component';

describe('RecetaEncontradaComponent', () => {
  let component: RecetaEncontradaComponent;
  let fixture: ComponentFixture<RecetaEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEncontradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
