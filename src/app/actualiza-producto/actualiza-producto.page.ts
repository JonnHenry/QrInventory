import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../api/productos.service';
import { ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.page.html',
  styleUrls: ['./actualiza-producto.page.scss'],
})
export class ActualizaProductoPage implements OnInit {

  private id: any;
  public producto: any;
  public prodCargados = false;

  // tslint:disable-next-line:max-line-length
  constructor( private route: ActivatedRoute, private statusBar: StatusBar, private router: Router, private servProductos: ProductosService, private toastController: ToastController) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProducto();
  }

  getProducto() {
    this.prodCargados = false;
    this.servProductos.getProducto(this.id).subscribe(
      result => {
        if (result.errorBuscar) { // Hay un error o no encuentra el producto
          this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
          this.router.navigate(['productos']);
        } else {
          this.producto = result.data;
          this.prodCargados = true;
        }
      },
      error  => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
        this.router.navigate(['productos']);
      });
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000
    });
    toast.present();
  }

  return() {
    this.router.navigate(['productos']);
  }

  updateProduct(formUpdateProducto) {
    this.servProductos.updateProducto(this.producto.codigoProducto, this.producto).subscribe(
      result => {
        this.presentToast('El producto se ha actualizado de manera correcta');
        this.presentToast(result.respuesta);
        formUpdateProducto.reset();
        this.router.navigate(['productos']);
      },
      err => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      }
    );
  }

}
