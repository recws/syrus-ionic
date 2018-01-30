import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ProbarConexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-probar-conexion',
  templateUrl: 'probar-conexion.html',
  providers: [BLE]
})
export class ProbarConexionPage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ble: BLE, public ngZone: NgZone, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProbarConexionPage');
  }

  connect(){
		this.scan();
	}

	disconnect(){
		
  }
  
  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.isEnabled().then((result) => {
        this.ble.scan([], 5).subscribe(
          device => this.onDeviceDiscovered(device), 
          error => this.scanError(error)
        );
    }).catch((error) =>
    {
      this.setStatus('Ocurrio un error al consultar el estatus del bluetooth. (Actualmente desactivado)');
    });


    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }
  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    // this.navCtrl.push(DetailPage, {
    //   device: device
    // });
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
}
