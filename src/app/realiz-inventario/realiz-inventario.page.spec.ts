import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizInventarioPage } from './realiz-inventario.page';

describe('RealizInventarioPage', () => {
  let component: RealizInventarioPage;
  let fixture: ComponentFixture<RealizInventarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizInventarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
