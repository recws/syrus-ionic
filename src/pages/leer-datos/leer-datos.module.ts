import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeerDatosPage } from './leer-datos';

@NgModule({
  declarations: [
    LeerDatosPage,
  ],
  imports: [
    IonicPageModule.forChild(LeerDatosPage),
  ],
})
export class LeerDatosPageModule {}
