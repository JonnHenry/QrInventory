import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'productos', loadChildren: './productos/productos.module#ProductosPageModule' },
  { path: 'inventarios', loadChildren: './inventarios/inventarios.module#InventariosPageModule' },
  { path: 'realizarInventario/:id', loadChildren: './realiz-inventario/realiz-inventario.module#RealizInventarioPageModule' },
  { path: 'crear-producto', loadChildren: './crear-producto/crear-producto.module#CrearProductoPageModule' },
  { path: 'crear-inventario', loadChildren: './crear-inventario/crear-inventario.module#CrearInventarioPageModule' },
  { path: 'actualiza-producto/:id', loadChildren: './actualiza-producto/actualiza-producto.module#ActualizaProductoPageModule' },
  { path: 'inventario-productos/:id', loadChildren: './inventario-productos/inventario-productos.module#InventarioProductosPageModule' },
  { path: 'inv-prod-crear', loadChildren: './inv-prod-crear/inv-prod-crear.module#InvProdCrearPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
