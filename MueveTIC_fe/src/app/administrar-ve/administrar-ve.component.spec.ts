import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarVeComponent } from './administrar-ve.component';

describe('AdministrarVeComponent', () => {
  let component: AdministrarVeComponent;
  let fixture: ComponentFixture<AdministrarVeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarVeComponent]
    });
    fixture = TestBed.createComponent(AdministrarVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
