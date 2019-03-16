import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InventariosService } from '../api/inventarios.service';

@Component({
  selector: 'app-inv-prod-crear',
  templateUrl: './inv-prod-crear.page.html',
  styleUrls: ['./inv-prod-crear.page.scss'],
})
export class InvProdCrearPage implements OnInit {

  public inventarios = [];
  private invtService: InventariosService;
  public prodCargados = false;
  public cantProd = -1;
  private navigationSubscription: any;

  constructor(private router: Router, public toastController: ToastController, private invetarioService: InventariosService) { 
    this.invtService = invetarioService;
    this.navigationSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
         this.getInventarios(false);
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

  doRefresh(event) {
    this.getInventarios(true);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getInventarios(toastInvisible) { //Falso si se quiere que se vea el refresh
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
      this.cantProd = 0;
      this.prodCargados = true;
    });
  }

  crearInvetaProduct(item) {
    this.router.navigate(['realizarInventario', item.codigoInventario]);
  }


}