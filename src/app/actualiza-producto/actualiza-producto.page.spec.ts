import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaProductoPage } from './actualiza-producto.page';

describe('ActualizaProductoPage', () => {
  let component: ActualizaProductoPage;
  let fixture: ComponentFixture<ActualizaProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizaProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
