import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IntroPage } from '../pages/intro/intro';
import {SimpleTimer} from 'ng2-simple-timer';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { FilterLocationPage } from '../pages/filterlocation/filterlocation';
import { Change_passwordPage } from '../pages/change_password/change_password';
import { Forgot_passwordPage } from '../pages/forgot_password/forgot_password';
import { Edit_profilePage } from '../pages/edit_profile/edit_profile';
import { Appsetting } from '../providers/appsetting';
import { VariableProvider } from '../providers/Variables';
import { CommonProvider } from '../providers/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { Page3Page } from '../pages/page3/page3';
import {LogoutPage } from '../pages/logout/logout';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'firebase/auth';
import { cuisineFilterPage } from '../pages/cuisineFilter/cuisineFilter';
import { DetailPage } from '../pages/detail/detail';
import { Deal_detailPage } from '../pages/deal_detail/deal_detail';
import { LocationPage } from '../pages/location/location';
import {ModalPage } from '../pages/modal/modal';
// import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
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
// import {CountDown} from "angular2-simple-countdown/countdown";
export const firebaseConfig = {
          apiKey: "AIzaSyANPpWqn-_3lfA923tROvtHkfeZ1z2_e0c",
          authDomain: "mogodeals-a0d12.firebaseapp.com",
          databaseURL: "https://mogodeals-a0d12.firebaseio.com/",
          projectId: "mogodeals-a0d12",
          storageBucket: "mogodeals-a0d12.appspot.com",
          messagingSenderId: "571521622422"

};
@NgModule({
  declarations: [
    // CountDown,
    MyApp,
    MapPage,
    ModalPage,
    LocationPage,
    HomePage,
    cuisineFilterPage,
    ListPage,
    SignupPage,
    IntroPage,
    DetailPage,
    Deal_detailPage,
    LoginPage,
    Change_passwordPage,
    Forgot_passwordPage,
    Edit_profilePage,
    FilterLocationPage,
    LogoutPage,
    TabsPage,
    RedemodalPage,
    Page3Page
  ],
  imports: [
    
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage,
    cuisineFilterPage,
    FilterLocationPage,
    LocationPage,
    ListPage,
    SignupPage,
    DetailPage,
    Deal_detailPage,
    IntroPage,
    MapPage,
    LoginPage,
    Change_passwordPage,
    Forgot_passwordPage,
    Edit_profilePage,
    LogoutPage,
    RedemodalPage,
    TabsPage,
    Page3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Appsetting,
    VariableProvider,
    CommonProvider,
    Facebook,
    AngularFireAuth,
    TwitterConnect,
    Firebase,
    Camera,
     GooglePlus,
     Geolocation,
     SocialSharing,
     SimpleTimer,
     GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
