import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioProductosPage } from './inventario-productos.page';

describe('InventarioProductosPage', () => {
  let component: InventarioProductosPage;
  let fixture: ComponentFixture<InventarioProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioProductosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
