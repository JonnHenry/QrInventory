import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInventarioPage } from './crear-inventario.page';

describe('CrearInventarioPage', () => {
  let component: CrearInventarioPage;
  let fixture: ComponentFixture<CrearInventarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInventarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
