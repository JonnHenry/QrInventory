import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RealizInventarioPage } from './realiz-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: RealizInventarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RealizInventarioPage]
})
export class RealizInventarioPageModule {}
