import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  password:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadCntrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  updatePass(){
    let load = this.loadCntrl.create({
      spinner: 'dots',
      content: 'Please Wait...',
      dismissOnPageChange : true
    });
    let toast:any;
    load.present();
    let currentUser = firebase.auth().currentUser;
    if(currentUser){
      currentUser.updatePassword(this.password)
      .then((resp)=>{
        load.dismiss();  
        toast = this.toastCtrl.create({
            message: "Password Update Success!",
            duration: 3000,
            position: 'top'
          });
        toast.present();      
      })
      .catch((error)=>{
        load.dismiss();
        console.log(error);
        toast = this.toastCtrl.create({
          message: "Password Update Failed!",
          duration: 3000,
          position: 'top'
        });
      toast.present(); 
      });
    }else{
      toast = this.toastCtrl.create({
        message: "Auth Failure!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
}
