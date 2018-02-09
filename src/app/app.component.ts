import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,Events,MenuController} from 'ionic-angular';
import { FilterLocationPage } from '../pages/filterlocation/filterlocation';
// import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {LoadingController} from 'ionic-angular';
import { DetailPage } from '../pages/detail/detail';
import { Deal_detailPage } from '../pages/deal_detail/deal_detail';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { Change_passwordPage } from '../pages/change_password/change_password';
import { MapPage } from '../pages/map/map';
import { Forgot_passwordPage } from '../pages/forgot_password/forgot_password';
import { Edit_profilePage } from '../pages/edit_profile/edit_profile';
import { cuisineFilterPage } from '../pages/cuisineFilter/cuisineFilter';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocationPage } from '../pages/location/location';
import {ModalPage } from '../pages/modal/modal';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { AlertController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import 'firebase/auth';
import firebase from 'firebase/app';
import { TabsPage } from '../pages/tabs/tabs';
import { Page3Page } from '../pages/page3/page3';
import {LogoutPage } from '../pages/logout/logout';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../providers/appsetting';
import { ToastController } from 'ionic-angular';
// import {Camera,CameraOptions} from '@ionic-native/camera';
import { VariableProvider } from '../providers/Variables';
import { GooglePlus } from '@ionic-native/google-plus';
import { RedemodalPage } from '../pages/redemodal/redemodal';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  FBUSERID: string;
  public checkpassword = 1;
  google_id: string;
  User_twid: any;
  User_fbid: string;
  public uname = '';
  public srcimage = '';
  public User_id = '';

  alert: any;
  currentuserfb: string;
  serializeObj(obj){
                    var result = [];
                
                    for (var property in obj)
                    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                    return result.join("&");
  }
  @ViewChild(Nav) nav: Nav;



  rootPage: any = TabsPage;


  

  pages: Array<{title: string, component: any}>;
 pages2: any;
  constructor(public platform: Platform,private twitter: TwitterConnect, private menu: MenuController,   private googlePlus: GooglePlus,  public afAuth: AngularFireAuth,public alertCtrl: AlertController,private facebook: Facebook, public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen,public loadingCtrl: LoadingController, public toastCtrl: ToastController,public http: Http,public variable: VariableProvider) {
    this.google_id = localStorage.getItem("GOOGLEUSERID");
    this.User_twid = localStorage.getItem("TWUSERID");
    this.User_fbid = localStorage.getItem("FBUSERID");
    if(this.google_id != null){
      this.checkpassword = 0;
    }else if(this.User_twid != null){
      this.checkpassword = 0;
    }else if(this.User_fbid != null){
      this.checkpassword = 0;
    }else{
      this.checkpassword = 1;
    }
    this.initializeApp();
    this.menu.swipeEnable(false, 'menu1');
   
  

  //   this.pages = [
  //     { title: 'Home', component: HomePage },
  //     { title: 'List', component: ListPage },
  //      { title: 'Change_password', component: Change_passwordPage },
  //      { title: 'Edit_profile', component: Edit_profilePage }
  //   ];
  // this.pages2 = {
  //     homePage: HomePage,
  //     listPage: ListPage, 
  //     change_passwordPage: Change_passwordPage,
  //     edit_profilePage: Edit_profilePage,
  //     login : LoginPage
     
  //   } 
  
      this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'My Deals', component: ListPage },
       { title: 'Change_password', component: Change_passwordPage },
       { title: 'Edit_profile', component: Edit_profilePage },
        { title: 'Logout', component: LogoutPage },
         { title: 'Page3', component: Page3Page }
        
    ];
  this.pages2 = {
      homePage: TabsPage,
      listPage: ListPage, 
      change_passwordPage: Change_passwordPage,
      edit_profilePage: Edit_profilePage,
      logoutPage: LogoutPage,
      
     
    } 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       this.platform.registerBackButtonAction(() => {
           let view = this.nav.getActive();
            if (view.component.name == HomePage) {
           
               this.alert = this.alertCtrl.create({
        title: 'Exit?',
        message: 'Do you want to exit the app?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.alert =null;
            }
          },
          {
            text: 'Exit',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.alert.present();
            }else if(this.nav.canGoBack()){
                  this.alert = this.alertCtrl.create({
        title: 'Exit?',
        message: 'Do you want to exit the app?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.alert =null;
            }
          },
          {
            text: 'Exit',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.alert.present();

            }
      })
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

   
}
