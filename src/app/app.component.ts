import { EntryPage } from './../pages/entry/entry';
import { RegisterPage } from './../pages/register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../pages/home/home';
import { MainPage } from './../pages/main/main';
import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = EntryPage;
  pages: Array<{title:string, component:any}>;
  user:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private afAuth: AngularFireAuth, private menuCtrl: MenuController
            ) {
    this.menuCtrl.enable(false);
    this.pages = [{title:"Dash Board", component:MainPage},
                  {title: "Update Password", component: RegisterPage}
                 ];

    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.menuCtrl.enable(true);
        this.rootPage = MainPage;
        this.user = user;
      } else {
        this.menuCtrl.enable(false);
        this.rootPage = HomePage;
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logOut(){
    firebase.database().goOffline();
    this.afAuth.auth.signOut();
  }
}

