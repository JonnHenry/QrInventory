import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InventarioProductosPage } from './inventario-productos.page';

const routes: Routes = [
  {
    path: '',
    component: InventarioProductosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventarioProductosPage]
})
export class InventarioProductosPageModule {}
