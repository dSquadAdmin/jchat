import { EntryPage } from './../pages/entry/entry';
import { RegisterPage } from './../pages/register/register';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';
import { Toast } from '@ionic-native/toast';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ElasticModule } from 'ng-elastic';

export const firebaseConfig = {
  apiKey: "AIzaSyDhKNIt43G22rnt78cwtfjfG4917Mv0C_g",
  authDomain: "keshav-2bd0c.firebaseapp.com",
  databaseURL: "https://keshav-2bd0c.firebaseio.com",
  projectId: "keshav-2bd0c",
  storageBucket: "keshav-2bd0c.appspot.com",
  messagingSenderId: "909789272472"
}

@NgModule({
  declarations: [
    MyApp,
    EntryPage,
    HomePage,
    MainPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    ElasticModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntryPage,
    HomePage,
    MainPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
