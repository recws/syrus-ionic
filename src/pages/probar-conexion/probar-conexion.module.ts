import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProbarConexionPage } from './probar-conexion';

@NgModule({
  declarations: [
    ProbarConexionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProbarConexionPage),
  ],
})
export class ProbarConexionPageModule {}
