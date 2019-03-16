import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvProdCrearPage } from './inv-prod-crear.page';

describe('InvProdCrearPage', () => {
  let component: InvProdCrearPage;
  let fixture: ComponentFixture<InvProdCrearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvProdCrearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvProdCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
