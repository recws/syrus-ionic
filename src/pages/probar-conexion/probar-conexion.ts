import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { ToastController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  providers: [BLE,Diagnostic]
})
export class ProbarConexionPage {

  devices: any[] = [];
  statusMessage: string;
  DispositivoConectado: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public ble: BLE, public ngZone: NgZone, public toastCtrl: ToastController, private diagnostic: Diagnostic) {

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

    // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    // let errorCallback = (e) => console.error(e);
    // this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    // this.diagnostic.isBluetoothAvailable().then(successCallback, errorCallback);


    
    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////// Forma para pedir VARIOS PERMISOS en una sola solicitud /////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    this.DesconectarSyrus(this.DispositivoConectado);

    var list_permissions = [
      this.diagnostic.permission.CAMERA,
      this.diagnostic.permission.ACCESS_COARSE_LOCATION,
      this.diagnostic.permission.ACCESS_FINE_LOCATION,
      this.diagnostic.permission.SEND_SMS,
      this.diagnostic.permission.READ_SMS,
      this.diagnostic.permission.RECEIVE_SMS,
      this.diagnostic.permission.RECORD_AUDIO,
      this.diagnostic.permission.READ_EXTERNAL_STORAGE,
      this.diagnostic.permission.WRITE_EXTERNAL_STORAGE
    ];

    this.diagnostic.requestRuntimePermissions(list_permissions)
    .then((state) => {
      this.setStatus('Permisos autorizados');
    }).catch((error) => {
      console.log(error);
    });

    //Cargar listado de dispositivos cercanos
    this.diagnostic.getBluetoothState()
      .then((state) => {
        if (state == this.diagnostic.bluetoothState.POWERED_ON){
          this.setStatus('Scanning for Bluetooth LE Devices');
          this.devices = [];  // clear list
          this.ble.isEnabled()
            .then((result) => {
                this.ble.scan([], 5).subscribe(
                  device => this.onDeviceDiscovered(device), 
                  error => this.scanError(error)
                );
            })
            .catch((error) => {
                this.setStatus('Ocurrio un error al consultar el estatus del bluetooth. (Actualmente desactivado)');
            });
        } else {
          // do something else
          this.ble.enable();
        }
      }).catch(
        e => console.error(e)
      );

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////Forma para pedir un permiso individual/////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
      // this.diagnostic.isCameraAuthorized()
      // .then((state) => {
      //   if (state == this.diagnostic.getCameraAuthorizationStatus()){
      //     this.setStatus('Camara autorizada');
      //   } else {
      //     this.setStatus('Solicitando autorizacion de la camara');
      //     let permission = this.diagnostic.permission;
      //     this.diagnostic.requestRuntimePermission(permission.CAMERA).then(
      //       success => {
      //         this.setStatus('reuqestCameraAuthroization, success');
      //         console.log('reuqestCameraAuthroization, success', success);
      //       },
      //       error => {
      //         this.setStatus('reuqestCameraAuthroization, error');
      //         console.log('reuqestCameraAuthroization, error', error);
      //       },
      //     );
      //   }
      // }).catch(
      //   e => console.error(e)
      // );

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////Forma para pedir un permiso individual/////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
      // this.diagnostic.isLocationAuthorized()
      // .then((state) => {
      //   if (state == this.diagnostic.getCameraAuthorizationStatus()){
      //     this.setStatus('Localizacion autorizada');
      //   } else {
      //     this.setStatus('Solicitando autorizacion de localizacion');

      //     let permission = this.diagnostic.permission;    
      //     this.diagnostic.requestRuntimePermission(permission.ACCESS_FINE_LOCATION).then(
      //       success => {
      //         this.setStatus('reuqestLocationAuthroization, success');
      //         console.log('reuqestLocationAuthroization, success', success);
      //       },
      //       error => {
      //         this.setStatus('reuqestLocationAuthroization, error');
      //         console.log('reuqestLocationAuthroization, error', error);
      //       },
      //     );
      //   }
      // }).catch(
      //   e => console.error(e)
      // );


    // setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });

    if (device.name=="Syrus 3GBT 76516"){
      this.ConectaraSyrus(device);      
    }
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

  ConectaraSyrus(device){      
    // this.DesconectarSyrus(device);
      this.setStatus('Conectando a... ' + device.name);

      this.ble.connect(device.id).subscribe(
        (data)=>{
          this.DispositivoConectado=device;
          this.setStatus('Conectado a... '  + device.name);
          this.sendBluetoothAuth(device,'357042063176516');
          this.ListenMessageBT();          
        },
        (err)=>{
            this.setStatus('Error al conectar a... '  + device.name);
        }
    );
  }
  DesconectarSyrus(device){
    try{

      if (device==null || device.id==undefined || device.id==""){
        return;
      }

    this.ble.disconnect(device.id).then(
      (response)=>{
        this.setStatus('Desconectado de... '  + device.name);
      })
    .catch(
      (err)=>{
        this.setStatus('Error al desconectar de... '  + device.name);
      })
    }
    catch(e){
      this.setStatus(e);
    }
  }


  sendBluetoothAuth(device,IMEI){
    // Send command larger than 50 on two partitions
    var code = IMEI.substr(IMEI.length -5);
    this.SendMessageBT(device,">SBIK" + code + "<");
    this.setStatus('Enviando Autorizacion BT ' + device.name);
  }

SendMessageBT(device,command){
  this.ble.writeWithoutResponse(device.id, "00000000-dc70-0080-dc70-a07ba85ee4d6", "00000000-dc70-0180-dc70-a07ba85ee4d6", this.stringToBytes(command)).
    then((data)=>{
      this.setStatus('Comando enviado... '  + command);
      return data;
    }).
    catch((err)=>{
        console.error(err);
    });
}

ListenMessageBT() {
  this.ble.startNotification(this.DispositivoConectado.id, "00000000-dc70-0080-dc70-a07ba85ee4d6", "00000000-dc70-0180-dc70-a07ba85ee4d6")
  .subscribe((data)=>{
    var buffer: any;
      if(this.bytesToString(data).indexOf(">")!= -1){
          buffer = "";
      }
      buffer += this.bytesToString(data);
      if(buffer.indexOf("<")!= -1)
      {
        this.setStatus('Mensaje recibido... '  + buffer);
        buffer = "";
        // this.commandProcceser();

        if(buffer.indexOf("RBIK1")!= -1){
          this.setStatus('Autenticado... '  + buffer);
        }
      }
  },(err)=>{
      console.error(err);
  });
}

stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
  }
  return array.buffer;
}
bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
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
