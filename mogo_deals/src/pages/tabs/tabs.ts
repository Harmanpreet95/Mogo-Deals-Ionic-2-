

import { ListPage } from '../list/list';
import { Component } from '@angular/core';
import { Page3Page } from '../page3/page3';
import { HomePage } from '../home/home';
import { Edit_profilePage } from '../edit_profile/edit_profile';
import {ModalPage } from '../modal/modal';
import { LoginPage } from '../login/login';
import { NavController,Events, NavParams ,Nav} from 'ionic-angular';
/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public User_fbid: any = null;
  public User_twid: any = null;
  public google_id: any = null;
    //  ionViewDidLoad() {
    // console.log("tabs")
    // this.userid = localStorage.getItem('USERID');
    //     console.log("tabs->",this.userid);
    //   }
public userid : any = null;
   
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ModalPage;
  tab3Root: any = ListPage;
  tab4Root: any = Edit_profilePage;
  tab21Root : any = LoginPage;

  constructor(public navCtrl: NavController, public navparams : NavParams, public events : Events,public nav : Nav) {
          this.userid = localStorage.getItem('USERID');
        // this.events.subscribe('userid', (id)=>{
           
        //     console.log("tabs->",id);
        //     this.userid = id;
        // })

        // this.userid = this.navparams.get('userid');
        // console.log("tabs->",this.userid);
  }
myMethod(){
  console.log('jhgj');
  this.userid = localStorage.getItem('USERID');
  this.google_id = localStorage.getItem("GOOGLEUSERID");
  this.User_twid = localStorage.getItem("TWUSERID");
  this.User_fbid = localStorage.getItem("FBUSERID");
  if(this.userid != null || this.google_id != null || this.User_twid != null || this.User_fbid != null){
    this.navCtrl.push(Edit_profilePage);
  }else{
    this.navCtrl.push(LoginPage);
  }
}


mydeals(){
  this.userid = localStorage.getItem('USERID');
  this.google_id = localStorage.getItem("GOOGLEUSERID");
  this.User_twid = localStorage.getItem("TWUSERID");
  this.User_fbid = localStorage.getItem("FBUSERID");
  // alert(this.User_twid);
  if(this.userid != null || this.google_id != null || this.User_twid != null || this.User_fbid != null){
    //  alert('if');
     this.navCtrl.push(ListPage);
  }else{

    //  alert('else');
    this.navCtrl.push(LoginPage);
  }
}
}
