import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActualizaProductoPage } from './actualiza-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizaProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActualizaProductoPage]
})
export class ActualizaProductoPageModule {}
