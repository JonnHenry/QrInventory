import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvetProdService } from '../api/invet-prod.service';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-realiz-inventario',
  templateUrl: './realiz-inventario.page.html',
  styleUrls: ['./realiz-inventario.page.scss'],
})
export class RealizInventarioPage implements OnInit {

  private invtProdService: InvetProdService;
  public invtProd: any;
  public confirmacion = true;
  private id: any;

  // tslint:disable-next-line:max-line-length
  constructor(private barcodeScanner: BarcodeScanner,private route: ActivatedRoute, private invetProdService: InvetProdService, public toastController: ToastController, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.invtProdService = invetProdService;
    this.confirmacion = true;
    this.invtProd = {
      'codInventario': 0,
      'codProducto': 0,
      'cantidad': 1
    };
   }

  ngOnInit() {
  }

  return() {
    this.invtProd.codInventario = 0;
    this.invtProd.codProducto = 0;
    this.invtProd.cantidad = 1;
    this.router.navigate(['inv-prod-crear']);
  }


  agregarProductInventario(formInventarioProducto) {
    this.confirmacion = false;
    this.invtProd.codInventario = this.id;
    this.invtProdService.addProductoInventario(this.invtProd).subscribe(
      (result) => {
        if (result.agregado) {
          this.presentToast(result.respuesta);
          this.invtProd.codProducto = 0;
          formInventarioProducto.reset();
        } else {
          this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo');
        }
        this.confirmacion = true;
      },
      (err) => {
        this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo');
        this.confirmacion = true;
      }
    );
    
  } 

  leerCodigo(){
    this.barcodeScanner.scan({
      resultDisplayDuration: 1000, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    }).then(result => {
        if (result.cancelled) {
          this.invtProd.codProducto = 0;
        } else {
          this.invtProd.codProducto = result.text;
        }
       })
       .catch(error => {
        this.presentToast('Escanner fallido, vuelva a intentarlo');
        this.invtProd.codProducto = 0;
       });
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }

}
