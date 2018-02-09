import { Component } from '@angular/core';
import {Nav, NavController,Platform ,NavParams} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Change_passwordPage } from '../change_password/change_password';
import { ActionSheetController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
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
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class  MapPage {
 public lat : '';
 public long : '';

  map: GoogleMap;
  mapElement: HTMLElement;
  Loading: any;
    //  ionViewDidLoad() {
    //   this.loadMap();
    //   }
    // ngOnInit() {
  
    //  var lat1:number =  JSON.parse(localStorage.getItem('deallat'));
    //  var long:number = JSON.parse(localStorage.getItem('deallong'));
    //  console.log(lat1);
    //  console.log(long);
    //     var myLatLng = {lat: lat1, lng: long};

    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       zoom: 10,
    //       center: myLatLng
    //     });

    //     var marker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       title: 'Hello World!'
    //     });
    // }
  constructor(public navCtrl: NavController,public platform: Platform,private googleMaps: GoogleMaps,public nav : Nav,public loadingCtrl:LoadingController,public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public appsetting : Appsetting ,public http: Http,public variable: VariableProvider  ) {

      
          //  this.platform.ready().then(() => {

  //  });
     

 

  }
               
 




}
