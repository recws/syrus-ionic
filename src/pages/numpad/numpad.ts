import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the NumpadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-numpad',
  templateUrl: 'numpad.html',
})
export class NumpadPage {
  passCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.passCode='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NumpadPage');
  }

  onNumClick(num:number){    
    this.passCode += num.toString();    
  }

  clear(){
    this.passCode = '';
  }

  finish(){
    if (this.passCode.length == 4){
      let alert = this.alertCtrl.create({
        title: 'Password',
        subTitle:  'El numero es: ' + this.passCode,
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle:  'La longitud debe ser cuatro',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
