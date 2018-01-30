import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LeerDatosPage } from '../pages/leer-datos/leer-datos';
import { ProbarConexionPage } from '../pages/probar-conexion/probar-conexion';
import { NumpadPage } from '../pages/numpad/numpad';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErpApiProvider } from '../providers/erp-api/erp-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LeerDatosPage,
    NumpadPage,
    ProbarConexionPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NumpadPage,
    ListPage,
    LeerDatosPage,
    ProbarConexionPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErpApiProvider
  ]
})
export class AppModule {}
