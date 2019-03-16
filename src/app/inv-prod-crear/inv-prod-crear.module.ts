import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvProdCrearPage } from './inv-prod-crear.page';

const routes: Routes = [
  {
    path: '',
    component: InvProdCrearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvProdCrearPage]
})
export class InvProdCrearPageModule {}
