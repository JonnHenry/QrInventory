import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    public menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastController: ToastController,
    private network: Network
  ) {
    this.initializeApp();
    this.network.onDisconnect().subscribe(() => {
      this.presentToast('No hay conexión a Internet! :-(');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(true);
    });
  }

  async presentToast(mensage) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }

  salir() {
    navigator['app'].exitApp();
  }

  menuOpened(){
    this.statusBar.backgroundColorByHexString('#3880ff');
  }

  menuClosed(){
    this.statusBar.backgroundColorByHexString('#989aa2');
  }
}
