import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPage } from './inventarios.page';

describe('InventariosPage', () => {
  let component: InventariosPage;
  let fixture: ComponentFixture<InventariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
