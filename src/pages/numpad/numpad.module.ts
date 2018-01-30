import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NumpadPage } from './numpad';

@NgModule({
  declarations: [
    NumpadPage,
  ],
  imports: [
    IonicPageModule.forChild(NumpadPage),
  ],
})
export class NumpadPageModule {}
