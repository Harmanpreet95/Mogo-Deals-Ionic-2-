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
    this.show_profile();
     events.subscribe('user:login', () => {
        this.show_profile();
      });

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
              //  let toast = this.toastCtrl.create({
              //           message:  'Press back again to exit App?',
              //           duration: 3000,
              //           position: 'bottom'
              //       });
              //       toast.present();
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

logout(): firebase.Promise<any>{
          this.User_twid = localStorage.getItem("TWUSERID");
          this.google_id = localStorage.getItem("GOOGLEUSERID");
           var currentuserfb =  localStorage.getItem("USERID");
           var currentuser =  localStorage.getItem("USER_DATA");
               this.FBUSERID = localStorage.getItem("FBUSERID");
            let loadings = this.loadingCtrl.create({
              content: 'Logging Out...'
            });
            loadings.present();
            console.log(currentuser);
            console.log(currentuserfb);
            console.log(this.User_twid);
          if(this.FBUSERID != null){
            // alert('fb');
              return this.afAuth.auth.signOut().then((suc)=>{
                  // alert(JSON.stringify(suc));
                    this.facebook.logout().then((response)=>{
              loadings.dismiss();
                    //   alert("fbsucclOG -> "+JSON.stringify(response))
                      localStorage.clear();
                    this.nav.setRoot(this.pages2.login);
                
                  }).catch((error)=>{
              loadings.dismiss();
                        localStorage.clear();
                    // alert("fbError -> "+JSON.stringify(error))
                       this.nav.setRoot(this.pages2.login);
              
                  })
                }).catch((err)=>{
                   loadings.dismiss();
                   //  alert('err'+JSON.stringify(err));
                  this.facebook.logout().then((response)=>{
                    //  alert("fbsucclOG -> "+JSON.stringify(response))
                      localStorage.clear();
                     this.nav.setRoot(this.pages2.login);
                  }).catch((error)=>{
                    loadings.dismiss();
                    // alert("fbError -> "+JSON.stringify(error))
                      localStorage.clear();
                      this.nav.setRoot(this.pages2.login);
                  })
                });
          }else if(this.google_id != null){
            // alert('google');
                    this.googlePlus.logout()
                    .then(function (response) {

                  loadings.dismiss();
                  localStorage.removeItem("GOOGLEUSERID");
                  localStorage.clear();
                  this.nav.setRoot(this.pages2.login);
                    },function (error) {
                  
                  loadings.dismiss();
                  localStorage.removeItem("GOOGLEUSERID");
                  localStorage.clear();
                  this.nav.setRoot(this.pages2.login);
                    })
                }else if(this.User_twid != null){
                  // alert("tw")
                      this.twitter.logout()
                    .then(function (response) {

                  loadings.dismiss();
                  localStorage.removeItem("TWUSERID");
                  localStorage.clear();
                  this.nav.setRoot(this.pages2.login);
                    },function (error) {
                  
                  loadings.dismiss();
                  localStorage.removeItem("TWUSERID");
                  localStorage.clear();
                  this.nav.setRoot(this.pages2.login);
                    })
                  }else if(currentuser != null){
                loadings.dismiss();
                localStorage.clear();
                console.log(currentuser);
                this.nav.setRoot(this.pages2.login);


                    }else{
                    //  alert('else');
                loadings.dismiss();
                localStorage.clear();
                console.log(currentuser);
                localStorage.removeItem('USERID');
                this.nav.setRoot(this.pages2.login);
          }
}


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



    show_profile(){
                    
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");

                    console.log(this.User_fbid);
                    this.User_id = localStorage.getItem("USERID");
                    console.log("uid->",this.User_id);

                     if(this.User_fbid != null){
                       this.checkpassword = 0;
                      var data_allfb = ({
                                id : this.User_fbid
                      })
                    var serialized_all = this.serializeObj(data_allfb); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.srcimage = data.data.User.image;
                          this.uname = data.data.User.name;
                        }else{

                        }
                          

                        
                  })





                       ////////////////////////////
                       

                 }else if(this.User_twid != null){
                  this.checkpassword = 0;
                    var data_alltw = ({
                                id : this.User_twid
                      })
                    var serialized_alltw = this.serializeObj(data_alltw); 
                    console.log(serialized_alltw);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_alltw, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.srcimage = data.data.User.image;
                          this.uname = data.data.User.name;
                        }else{

                        }
                    })  
                   }else if(this.google_id != null){
                    this.checkpassword = 0;
                    var data_allgoogle = ({
                                id : this.google_id
                      })


                    var serialized_allgoogle = this.serializeObj(data_allgoogle); 
                    console.log(serialized_allgoogle);


                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_allgoogle, options).map(res=>res.json()).subscribe(datagoogle=>{
                
                        console.log(datagoogle);
                        if(datagoogle.isSuccess == true){
                          console.log(datagoogle.data.User);
                          console.log(datagoogle.data.User);
                          this.srcimage = datagoogle.data.User.image;
                          this.uname = datagoogle.data.User.name;
                        }else{

                        }
                    })  
                   }else{
                  //  alert("fb");
                          this.checkpassword = 1;
                        var data_all = ({
                                id : this.User_id
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.srcimage = data.data.User.image;
                          this.uname = data.data.User.name;
                   
                        }else{

                        }
                          
                    })
                     }
         }
}
