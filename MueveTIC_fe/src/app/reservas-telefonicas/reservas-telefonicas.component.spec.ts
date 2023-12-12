import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasTelefonicasComponent } from './reservas-telefonicas.component';

describe('ReservasTelefonicasComponent', () => {
  let component: ReservasTelefonicasComponent;
  let fixture: ComponentFixture<ReservasTelefonicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasTelefonicasComponent]
    });
    fixture = TestBed.createComponent(ReservasTelefonicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
