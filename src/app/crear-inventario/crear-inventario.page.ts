import { Component, OnInit } from '@angular/core';
import { InventariosService } from '../api/inventarios.service';
import { ToastController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-crear-inventario',
  templateUrl: './crear-inventario.page.html',
  styleUrls: ['./crear-inventario.page.scss'],
})
export class CrearInventarioPage implements OnInit {

  public inventario: any;
  public confirmacion = true;
  public invtService: InventariosService;

  constructor(private invetarioService: InventariosService, public toastController: ToastController, private router: Router) {
    this.invtService = invetarioService;
    this.inventario = {
      nombre: '',
      observacion: ''
    };
   }

  ngOnInit() {
  }

  return() {
    this.inventario.nombre = '';
    this.inventario.observacion = '';
    this.router.navigate(['inventarios']);
  }

  agregarInventario(formCreateInv) {
    this.confirmacion = false;
    this.invtService.addInventario(this.inventario).subscribe(
      result => {
        this.confirmacion = true;
        formCreateInv.reset();
        this.presentToast(result.respuesta);
        this.router.navigateByUrl('/inventarios');
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
