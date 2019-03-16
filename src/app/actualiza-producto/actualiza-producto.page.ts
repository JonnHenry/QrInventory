import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { ProductosService } from '../api/productos.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.page.html',
  styleUrls: ['./actualiza-producto.page.scss'],
})
export class ActualizaProductoPage implements OnInit {

  private id: any;
  public producto: any;
  public prodCargados = false;

  navigationSubscription: any;

  // tslint:disable-next-line:max-line-length
  constructor( private route: ActivatedRoute, private router: Router, private servProductos: ProductosService, private toastController: ToastController) { 
    this.id = this.route.snapshot.paramMap.get('id');

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getProducto();
      }
    });
  }

  ngOnInit() {
    // this.getProducto();
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
        this.router.navigateByUrl('/productos');
      },
      err => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      }
    );
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

}
