import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFormulasComponent } from './lista-formulas.component';

describe('ListaFormulasComponent', () => {
  let component: ListaFormulasComponent;
  let fixture: ComponentFixture<ListaFormulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFormulasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
