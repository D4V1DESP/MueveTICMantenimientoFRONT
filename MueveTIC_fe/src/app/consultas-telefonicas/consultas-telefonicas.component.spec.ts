import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasTelefonicasComponent } from './consultas-telefonicas.component';

describe('ConsultasTelefonicasComponent', () => {
  let component: ConsultasTelefonicasComponent;
  let fixture: ComponentFixture<ConsultasTelefonicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasTelefonicasComponent]
    });
    fixture = TestBed.createComponent(ConsultasTelefonicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
