import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionTelefonicaComponent } from './atencion-telefonica.component';

describe('AtencionTelefonicaComponent', () => {
  let component: AtencionTelefonicaComponent;
  let fixture: ComponentFixture<AtencionTelefonicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionTelefonicaComponent]
    });
    fixture = TestBed.createComponent(AtencionTelefonicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
