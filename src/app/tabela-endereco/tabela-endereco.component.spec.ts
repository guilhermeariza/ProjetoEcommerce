import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEnderecoComponent } from './tabela-endereco.component';

describe('TabelaEnderecoComponent', () => {
  let component: TabelaEnderecoComponent;
  let fixture: ComponentFixture<TabelaEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
