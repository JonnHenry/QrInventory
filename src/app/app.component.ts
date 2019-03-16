import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
    { title: 'Productos', url: '/productos', icon: 'list' },
    { title: 'Inventarios', url: '/inventarios', icon: 'list-box'},
    { title: 'Realizar Inventario', url: '/inv-prod-crear', icon: 'clipboard'},
    { title: 'Salir', url: '/salir', icon: 'exit'}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#989aa2');
      this.splashScreen.hide();
    });
  }
}
