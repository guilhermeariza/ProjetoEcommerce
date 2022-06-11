import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDadosClienteComponent } from './formulario-dados-cliente.component';

describe('FormularioDadosClienteComponent', () => {
  let component: FormularioDadosClienteComponent;
  let fixture: ComponentFixture<FormularioDadosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDadosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDadosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
