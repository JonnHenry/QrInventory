import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { InvetProdService } from '../api/invet-prod.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-inventario-productos',
  templateUrl: './inventario-productos.page.html',
  styleUrls: ['./inventario-productos.page.scss'],
})
export class InventarioProductosPage implements OnInit {
  public id: any;
  public productoInventarios = [];
  public cantProd = -1;
  public prodCargados = false;

  constructor(private statusBar: StatusBar, private route: ActivatedRoute, private invtService: InvetProdService, public toastController: ToastController, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    
   }

  ngOnInit() {
    this.getProdInventario(false, this.id);
  }

  return() {
    this.router.navigate(['inventarios']);
  }

  getProdInventario(toastInvisible, idInventario ) {
    this.productoInventarios = [];
    this.prodCargados = toastInvisible;
    this.invtService.getInventProductos(idInventario).subscribe(
      result => {
        if (result.errorBuscar ) {
          this.presentToast('Error, vuelva a abrir la pestaña');
          this.prodCargados = true;
        } else if (result.cantidadProductos === 0) {
          this.prodCargados = true;
          this.cantProd = 0;
          this.productoInventarios = result.data;
        } else {
          this.cantProd = result.cantidadInventarios;
          this.prodCargados = true;
          this.productoInventarios = result.data;
        }
    }, error  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
    });
  }

  doRefresh(event) {
    this.getProdInventario(true, this.id);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  delete(item) {
    this.invtService.deleteInventProductos(item.producto.codigoProducto, this.id).subscribe(
      result => {
        if (result.eliminado) {
          this.presentToast('El producto fue eliminado con exito');
          this.getProdInventario(false, this.id);
        } else {
          this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
        }
    }, error  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
    });
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000
    });
    toast.present();
  }

}
