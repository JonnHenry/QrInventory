import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../api/productos.service';
import { ToastController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss']
})
export class ProductosPage implements OnInit {

  public productos = [];
  public prodCargados = false;
  public cantProd = -1;
  private serviciosProductos: any;


  navigationSubscription: any;

  constructor( private servProductos: ProductosService, public toastController: ToastController, private router: Router) {
    this.serviciosProductos = servProductos;
    this.navigationSubscription = this.router.events.subscribe((e) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
         this.getProductos(false);
      }
    });
  }

  ngOnInit() {
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }

  getProductos(toastInvisible) { //falso si se quiere que se vea el refresh
    this.productos = [];
    this.prodCargados = toastInvisible;
    this.serviciosProductos.getProductos().subscribe(
      result => {
        if (result.errorBuscar ) {
          this.presentToast('Error, vuelva a abrir la pestaña');
          this.prodCargados = true;
        } else if (result.cantidadProductos === 0) {
          this.prodCargados = true;
          this.cantProd = 0;
          this.productos = result.data;
        } else {
          this.cantProd = result.cantidadProductos;
          this.prodCargados = true;
          this.productos = result.data;
        }
    }, error  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      this.prodCargados = true;
    });
  }

  delete(producto) {
    this.serviciosProductos.deleteProducto(producto.codigoProducto).subscribe(
      result => {
        if (result.eliminado) {
          this.presentToast('El producto se ha eliminado de manera correcta');
          this.getProductos(false);
        } else {
          this.prodCargados = true;
          this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
        }
    }, (error)  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      this.prodCargados = true;
    });
  }

  update(item){
    this.router.navigate(['actualiza-producto', item.codigoProducto]);
  }

  agregarProd() {
    this.router.navigate(['crear-producto']);
  }

  doRefresh(event) {
    this.getProductos(true);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ngOnDestroy() {
    this.productos = [];
    this.navigationSubscription.unsubscribe();
  }
  
}
