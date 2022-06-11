import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEspecificoComponent } from './produto-especifico.component';

describe('ProdutoEspecificoComponent', () => {
  let component: ProdutoEspecificoComponent;
  let fixture: ComponentFixture<ProdutoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoEspecificoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
