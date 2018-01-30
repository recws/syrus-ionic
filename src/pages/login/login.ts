import { Component } from '@angular/core';
import { IonicPage, NavController,  AlertController, LoadingController, Loading } from 'ionic-angular';
//NavParams
import { HomePage } from '../home/home';
import { ErpApiProvider } from '../../providers/erp-api/erp-api';
import { Input } from '@angular/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ErpApiProvider]
})

export class LoginPage {
  @Input () username: string="olopez";
  @Input () password: string="GCC0MERCE321";
  loading: Loading;
  
  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private erpService: ErpApiProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK'],    
    });
    alert.present();
  }

  public login() {
    this.showLoading();
    this.erpService.validaLogin(this.username, this.password).subscribe(allowed => {      
    if (allowed) {      
        this.nav.setRoot(HomePage);        
      } else {
        this.showError("Acceso Denegado");
      }      
    },
      error => {        
        console.log(error);
      });
  }
}
