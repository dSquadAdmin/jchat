import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  constructor(private loader:LoadingController) {
  }

  ionViewDidLoad() {
    let load = this.loader.create({
      spinner: 'dots',
      content: 'Please Wait ...',
      dismissOnPageChange : true
    });  

    load.present();
  }

}
