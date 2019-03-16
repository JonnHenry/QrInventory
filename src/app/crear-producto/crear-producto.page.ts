import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../api/productos.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  public producto: any;
  public confirmacion = true;
  private serviciosProductos: ProductosService;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private servProductos: ProductosService, private toastController: ToastController, private barcodeScanner: BarcodeScanner) {
    this.serviciosProductos = servProductos;
    this.producto = {
      codigoProducto: -1,
      nombre: '',
      observacion: ''
    };
   }

  ngOnInit() {

  }

  return() {
    this.producto.codigoProducto = -1;
    this.producto.nombre = '';
    this.producto.observacion = '';
    this.router.navigate(['productos']);
  }


  leerCodigo () {
    this.barcodeScanner.scan({
    resultDisplayDuration: 1000, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    disableAnimations : true, // iOS
    disableSuccessBeep: false // iOS and Android
  }).then(result => {
      if (result.cancelled) {
        this.producto.codigoProducto = -1;
      } else {
        this.producto.codigoProducto = result.text;
      }
     })
     .catch(error => {
      this.presentToast('Escanner fallido, vuelva a intentarlo');
      this.producto.codigoProducto = -1;
     });
  }

  agregarProduct(formCreateProducto) {
    this.confirmacion = false;
    this.serviciosProductos.addProducto(this.producto).subscribe(
      result => {
        this.confirmacion = true;
        formCreateProducto.reset();
        this.presentToast(result.respuesta);
        this.router.navigateByUrl('/productos');
      },
      err => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      }
    );
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }

}
