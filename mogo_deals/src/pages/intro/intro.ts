import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { VariableProvider } from '../../providers/Variables';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import firebase from 'firebase';
import * as firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  google_data: any;
  name_google: any;
  userTwitterResp: any;
  userTwt: string;
  User: string;
  userProfile: any;
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navCtrl: NavController,
    public navParams: NavParams,   
    private twitter: TwitterConnect,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    private fb: Facebook,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: Http,
    public variable: VariableProvider,
    private googlePlus: GooglePlus) {
      console.log('LOCALSTORAGE ',localStorage.getItem("USERID"));
    if(localStorage.getItem("USERID") != null){
     this.navCtrl.push(TabsPage);
       
    }
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad IntroPage');
  // }

 nxt_page(){

          this.navCtrl.push(SignupPage);

      }

login_nxt(){

          this.navCtrl.push(LoginPage);

      }
  public facebookLogin() : firebase.Promise<any> {
   
    if (this.platform.is('cordova')) {
      this.Loading.present();
      //  alert("if");
      return this.fb.login(['email', 'public_profile']).then(res => {
        // alert("enter");
        //  alert(JSON.stringify(res));
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.signInWithCredential(facebookCredential).then((success) => {

          // alert('Success->'+JSON.stringify(success));
          //   return this.afAuth.auth.signInWithEmailAndPassword(signup.value.email,signup.value.password).then((success) => {
          // console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          localStorage.setItem('logIn_role', 'FB');
          localStorage.setItem('User', JSON.stringify(this.userProfile));

          this.User = localStorage.getItem('User');
           let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          let options = new RequestOptions({ headers: headers });
          var url: string =  this.variable.baseUrl + this.variable.FACEBOOK_API;
          var data_fb = ({

            email : this.userProfile.email,
            name : this.userProfile.displayName,
            facebook_id : this.userProfile.uid,
            image : this.userProfile.photoURL

          });
          // alert(data_fb);
          // alert(JSON.stringify(data_fb));
           var serialized_fb = this.serializeObj(data_fb);
           console.log(serialized_fb);
          this.http.post(url, serialized_fb, options).map(res => res.json()).subscribe(datares => {
         
            this.Loading.dismiss();
          if(datares.isSuccess == true){
          localStorage.setItem('FBUSERID',datares.data.User.id);
          // alert(localStorage.getItem('FBUSERID'));
           let toast = this.toastCtrl.create({
                    message: datares.msg,
                    duration: 3000
                  });
                  toast.present();
    
          localStorage.setItem("USERID", datares.user_id);
          this.navCtrl.push(HomePage);
          }else{
            alert("unable to login");
            this.Loading.dismiss();
          }
          })
        })

          .catch((error) => {
            this.Loading.dismiss();
            console.log("Firebase failure: " + JSON.stringify(error));
            alert("Facebook Cannot be Connected! Try again....");

          });
      }).catch((error) => {
        this.Loading.dismiss();
        console.log(error)
         alert("Facebook Cannot be Connected! Try again....");
      });
    } else {
      // alert("else");
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
          //   return this.afAuth.auth.signInWithEmailAndPassword(signup.value.email,signup.value.password).then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));

          this.userProfile = success;
        //  alert(this.userProfile.user.displayName);
          console.log(this.userProfile.user.displayName.split(' '));
          var name1 = this.userProfile.user.displayName.split(' ');

          var User = localStorage.getItem('User');


        })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
           alert("Facebook Cannot be Connected! Try again....");
          //  this.navCtrl.push(ForgotpwPage);
          });
    }
  }
  
 twLogin(): void {
   this.Loading.present();
  //  alert("twitter")
    this.twitter.login().then(response => {
      // alert(JSON.stringify(response));
      // alert("response");
      this.userTwt = response.userName;
      // alert(this.userTwt);
      const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);

      firebase.auth().signInWithCredential(twitterCredential).then(userTwitter => {
      
          this.userTwitterResp = userTwitter;
  
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          let options = new RequestOptions({ headers: headers });
          var url: string =  this.variable.baseUrl + this.variable.TWITTER_API;
          var data_tw = ({

            username : this.userTwt,
            name : this.userTwitterResp.displayName,
            twitter_id : this.userTwitterResp.uid,
            image : this.userTwitterResp.photoURL

          });
       
           var serialized_tw = this.serializeObj(data_tw);
           console.log(serialized_tw);
          this.http.post(url, serialized_tw, options).map(res => res.json()).subscribe(datarestw => {
          this.Loading.dismiss();
       
          if(datarestw.isSuccess == true){
            localStorage.setItem('TWUSERID',datarestw.data.User.id);
                    let toast = this.toastCtrl.create({
                    message: datarestw.msg,
                    duration: 3000
                  });
                  toast.present();

                      this.navCtrl.push(HomePage);
          }else{
            let toast = this.toastCtrl.create({
                    message: datarestw.msg,
                    duration: 3000
                  });
                  toast.present();
          }
          })
      }, error => {
         this.Loading.dismiss();
        alert(JSON.stringify(error));
      });
    }, error => {
       this.Loading.dismiss();
      alert(JSON.stringify(error));
    });
  }



loginUser(): void {
 this.Loading.present();
  this.googlePlus.login({
    'webClientId': '571521622422-7eh41ledea26dieiu9vblaapa76dbe87.apps.googleusercontent.com',
    'offline': true
  }).then( res => {
  
    this.name_google = res.givenName;
  
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( success => {
       //  alert("Firebase success: " + JSON.stringify(success));
         this.google_data = success;
      


         var data_google = ({

            username : this.google_data.displayName,
            name : this.name_google,
            google_id : this.google_data.uid,
            image : this.google_data.photoURL,
            email : this.google_data.email

          });
      
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          let options = new RequestOptions({ headers: headers });
          var url: string =  this.variable.baseUrl + this.variable.GOOGLE_API;


          var serialized_google = this.serializeObj(data_google);
          console.log(serialized_google);
          this.http.post(url, serialized_google, options).map(res => res.json()).subscribe(datarestgoogle => {
          this.Loading.dismiss();
       
          if(datarestgoogle.isSuccess == true){
           
            localStorage.setItem('GOOGLEUSERID',datarestgoogle.data.User.id);
                    let toast = this.toastCtrl.create({
                    message: datarestgoogle.msg,
                    duration: 3000
                  });
                  toast.present();

                      this.navCtrl.push(HomePage);
          }else{
             this.Loading.dismiss();
            let toast = this.toastCtrl.create({
                    message: datarestgoogle.msg,
                    duration: 3000
                  });
                  toast.present();
                   this.googlePlus.logout()
                    .then(function (response) {
                  localStorage.removeItem("GOOGLEUSERID");
                  localStorage.clear();
               
                    })
          }
         })
      }, error => {
         this.Loading.dismiss();
        // alert(JSON.stringify(error));
      });
    }, error => {
      this.Loading.dismiss();
      // alert(JSON.stringify(error));
    });
  }
}
