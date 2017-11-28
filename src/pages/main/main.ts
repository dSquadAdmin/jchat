import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild(Content) content: Content;

  messages: AngularFireList<any>;
  messageList =  {} ;
  keys: string[];
  msgObserver:Observable<any>;
  message:string;
  email:string;
  subScriber:any;
  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                private db: AngularFireDatabase
              ) {
    let currentUser = firebase.auth().currentUser;
    if(currentUser){
      this.email = currentUser.email;
    }
    this.messages = this.db.list('messages');
    this.subScriber = this.listenMessage()
    .snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
          this.messageList[action.key] = action.payload.val();
          this.keys = Object.keys(this.messageList);      
      })
    });
  }

  ionViewDidLoad() {
    this.subScriber = this.listenMessage()
    .snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
          this.messageList[action.key] = action.payload.val();
          this.keys = Object.keys(this.messageList);      
      })
      this.ionViewDidEnter();
    }); 
    this.content.scrollToBottom(300);//300ms animation speed
  }
  
  ionViewDidEnter(){
    this.content.scrollToBottom(300);//300ms animation speed
  }
  
  listenMessage(){
    return this.db.list('messages');
  }

  sendMessage(){
    let currentUser = firebase.auth().currentUser;
    if(this.message !== '' && this.message !== null ){
      let msg = {
        name: currentUser.displayName,
        email: currentUser.email,
        profilePic: currentUser.photoURL,
        message: this.message,
        day: new Date().toDateString(),
        time: new Date().toLocaleTimeString()
      };
    
      this.messages.push(msg);
      this.message = '';
    }
  }
}