import { Component, OnInit } from '@angular/core';
import { InventariosService } from '../api/inventarios.service';
import { ToastController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.page.html',
  styleUrls: ['./inventarios.page.scss'],
})
export class InventariosPage implements OnInit {

  public inventarios = [];
  private invtService: InventariosService;
  public prodCargados = false;
  public cantProd = -1;
  private navigationSubscription: any;

  constructor(private invetarioService: InventariosService, private toastController: ToastController, private router: Router) {
    this.invtService = invetarioService;
    this.navigationSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
         this.getInventarios(false);
      }
    });
   }

  ngOnInit() {
  }

  getInventarios(toastInvisible) { //falso si se quiere que se vea el refresh
    this.inventarios = [];
    this.prodCargados = toastInvisible;
    this.invtService.getInventarios().subscribe(
      result => {
        if (result.errorBuscar ) {
          this.presentToast('Error, vuelva a abrir la pestaña');
          this.prodCargados = true;
        } else if (result.cantidadProductos === 0) {
          this.prodCargados = true;
          this.cantProd = 0;
          this.inventarios = result.data;
        } else {
          this.cantProd = result.cantidadInventarios;
          this.prodCargados = true;
          this.inventarios = result.data;
        }
    }, error  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      this.prodCargados = true;
    });
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }

  doRefresh(event) {
    this.getInventarios(true);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  delete(inventario) {
    this.invtService.deleteInventario(inventario.codigoInventario).subscribe(
      result => {
        if (result.eliminado) {
          this.presentToast('El inventario fue eliminado con exito');
          this.getInventarios(false);
        } else {
          this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
        }
    }, (error)  => {
      this.presentToast('Ha ocurrido un error inesperado, vuelva a intentarlo.');
      this.prodCargados = true;
    });
  }

  ngOnDestroy() {
    this.inventarios = [];
    this.navigationSubscription.unsubscribe();
  }

  viewProductos(item) {
    this.router.navigate(['inventario-productos', item.codigoInventario]);
  }

  agregarInvent() {
    this.router.navigate(['crear-inventario']);
  }

}
