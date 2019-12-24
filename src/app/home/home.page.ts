import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { BluetoothLE, ScanParams } from '@ionic-native/bluetooth-le/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uuidName = 'estimote';
  uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  id =   '0AD1257B-B7F8-626C-CBA1-049C1FC52D19';
  devices: any[] = [];
  statusMessage: string;
  test: ScanParams;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public ble: BLE,
    public plt: Platform,
    public bluetoothle: BluetoothLE,
    public ngZone: NgZone
  ) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  BluetoothLU() {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
      this.bluetoothle.startScan(this.test).subscribe(
        data => console.log('BlueTLU' + data),
        error => console.error(error)
      )
     });

  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

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
    const toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    console.log(toast);
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}
