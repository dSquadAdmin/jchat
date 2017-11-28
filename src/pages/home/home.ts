import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username:string;
  password:string;
  loader: any;
  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private load: LoadingController
  ) {
    this.loader = load.create({
      spinner: 'dots',
      content: 'Please Wait ...',
      duration: 5000
    });  
  }
  
  ionViewDidLoad() {
    
  }

  logIn(){
    if(this.username != null && this.password != null){
      this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password)
      .then(resp => {
        this.loader.present(); 
        this.navCtrl.setRoot(MainPage);
        this.navCtrl.popToRoot();
      })
      .catch(error =>{
        this.loader.dismiss();
        let toast = this.toast
        .create({
          message: "Invalid Log In",
          duration: 3000,
          position: 'center'
        });

        toast.present();
      });
    }else{
      let toast = this.toast
      .create({
        message: "Please provide username and Password!",
        duration: 3000,
        position: 'top'
      });

      toast.present();
    }
  }

  registerGoogle(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(resp => {
       this.navCtrl.setRoot(MainPage);
       this.navCtrl.popToRoot();
    })
    .catch(error =>{
      let toast = this.toast
      .create({
        message: "Error Logging In",
        duration: 3000,
        position: 'center'
      });

      toast.present();
    });
  }

}
