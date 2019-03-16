import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private subscription: any;
  disconnectSubscription: any;
 
  constructor(private network: Network,private toastController: ToastController, private platform: Platform) {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast('No hay conexión a Internet! :-(');
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

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
  });
}

}
