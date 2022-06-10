import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCartaoComponent } from './tabela-cartao.component';

describe('TabelaCartaoComponent', () => {
  let component: TabelaCartaoComponent;
  let fixture: ComponentFixture<TabelaCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
