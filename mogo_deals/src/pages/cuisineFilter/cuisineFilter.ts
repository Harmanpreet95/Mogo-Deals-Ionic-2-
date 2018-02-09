          import { Component} from '@angular/core';
          import { NavController,Events, MenuController,NavParams} from 'ionic-angular';
          import {Http, Headers, RequestOptions} from '@angular/http';
          import { Appsetting } from '../../providers/appsetting';
          import {LoadingController} from 'ionic-angular';
          import { ToastController } from 'ionic-angular';
          import { AlertController } from 'ionic-angular';
          import { VariableProvider } from '../../providers/Variables';
          import { LocationPage } from '../location/location';
          import {ModalPage } from '../modal/modal';
          import {MapPage } from '../map/map';
          import { ModalController } from 'ionic-angular';
          import { LoginPage } from '../login/login';
          import { Geolocation } from '@ionic-native/geolocation';
          import { DetailPage } from '../detail/detail';
          import {SimpleTimer} from 'ng2-simple-timer';
          import { CommonProvider } from '../../providers/common';
          // import {Component, OnInit} from '@angular/core';
          @Component({
          selector: 'page-cuisineFilter',
          templateUrl: 'cuisineFilter.html'
          })
          export class cuisineFilterPage {
            popular: any;
            typefav: any;
            dealcuisine: any;
            typename: any;


          public data='';
          public items = ''; 
          public name= ''; 
          public errorValue = '';
          public searchList = '';

          total_time: any;
          totaltym: string;
          currtym: string;
          tsec: number;
          tmins: number;
          thours: number;
          public endtime: any;
          deal_id: any;
          public checkpassword = 1;
          public listing: any;
          //////////////////************filter***********////////////
          autocompleteItems: any;
          autocomplete ={ query : '' };
          acService:any;
          placesService: any;
          //////////////////////////////////////////////////////////
          long: number;
          lat: number;
          google_id: string;
          User_twid: string;
          User_fbid: string;
          User_id: string;
          uname: any;
          srcimage: any;
          public Loading=this.loadingCtrl.create({
          content: 'Please wait...'
          });

          // counter0 = 30;
          public counter0;
          timer0Id: string;
          timer0button = 'Subscribe';


// *********************************SERIALIZE DATA**********************************
          serializeObj(obj){
                        var result = [];
                    
                        for (var property in obj)
                        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                        return result.join("&");
                    }
// *********************************************************************************


          //   	ngOnInit() {
          // 	this.st.newTimer('1sec',1);
          // 	this.st.newTimer('5sec',5);
          // 	this.st.newTimer('10sec',10);
          // 	this.subscribeTimer0();


          // }


          constructor(public navCtrl: NavController,public navParams: NavParams,public toastCtrl: ToastController,private menu: MenuController,public loadingCtrl:LoadingController,public modalCtrl: ModalController,private geolocation: Geolocation,public events: Events,public appsetting : Appsetting ,public common : CommonProvider,private st: SimpleTimer,public http: Http,public variable: VariableProvider) {
                  var currentDate = new Date();
                  console.log(currentDate);
                  this.menu.swipeEnable(false);
                  this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                  console.log(this.currtym);

                  if(this.google_id != null){
                    this.checkpassword = 0;
                  }else if(this.User_twid != null){
                    this.checkpassword = 0;
                  }else if(this.User_fbid != null){
                    this.checkpassword = 0;
                  }else{
                    this.checkpassword = 1;
                  }
                  this.typename = this.navParams.get('type');
                  this.typefav = this.navParams.get('myfavorites');
                  this.popular = this.navParams.get('mypopular');
                  this.cuisinefilter();
                  events.publish('user:login');
          }

// *******************************TIMER******************************
          subscribeTimer0() {
                  this.counter0 = 30;
                  if (this.timer0Id) {
                  // Unsubscribe if timer Id is defined
                        this.st.unsubscribe(this.timer0Id);
                        this.timer0Id = undefined;
                        this.timer0button = 'Subscribe';
                        console.log('timer 0 Unsubscribed.');
                  } else {
                  // Subscribe if timer Id is undefined
                        this.timer0Id = this.st.subscribe('1sec', e => this.timer0callback());
                        this.timer0button = 'Unsubscribe';
                        console.log('timer 0 Subscribed.');
                  }
                        console.log(this.st.getSubscription());
          }

          timer0callback() {

                if(this.counter0 == 0){
                      this.delAllTimer();
                }else{
                      this.counter0--;
                }

          }
          delAllTimer() {
              this.st.delTimer('1sec');
              // this.st.delTimer('5sec');
              // this.st.delTimer('10sec');
          }
// ***********************************************************************





// *************************MENU PROFILE***********************************
              show_profile(){
                        
                        this.google_id = localStorage.getItem("GOOGLEUSERID");
                        this.User_twid = localStorage.getItem("TWUSERID");
                        this.User_fbid = localStorage.getItem("FBUSERID");
                        this.User_id = localStorage.getItem("USERID");
                     

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
                          this.checkpassword = 1;
                      //  alert("fb");
                              
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
// **************************************************************************************************

            locat_nxt(){
                    this.navCtrl.push(LocationPage);
            }
            presentModal() {
                let modal = this.modalCtrl.create(ModalPage);
                modal.present();
            }
///////////////////////////////PUSH CUISINES////////////////////






//*********************************Cusisine Filter**************************************** */

cuisinefilter()
{
                console.log(this.popular);
                console.log(this.typename);
                console.log("fav",this.typefav);
                this.Loading.present();
                console.log(this.common.options);
                console.log("geo");
                this.User_id = localStorage.getItem("USERID");
                console.log(this.User_id);


                // ************************FAVORITE ONLY****************************
                if(this.User_id != null && this.typename == undefined && this.popular == '' && this.typefav != ''){
                      this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                            // type : this.typename,
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            fav : this.typefav
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })
                }
          //  *****************************POPULAR ONLY*******************************************     
                else if(this.User_id != null && this.typename == undefined && this.typefav == '' &&this.popular != ''){
 this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                           
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            popu : this.popular
                           
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })

                  
                  }
             //  *****************************TYPENAME  ONLY*******************************************       
                  
                  else if(this.User_id == null && this.typename != undefined && this.typefav == '' &&this.popular == ''){
 this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                           
                            lat : this.lat,
                            long : this.long,
                            type : this.typename
                           
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })
 //  *****************************TYPENAME with id ONLY*******************************************
                  
                  }else if(this.User_id != null && this.typename != undefined && this.typefav == '' && this.popular == ''){
                  this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                            type : this.typename,
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                           
                           
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })   
      //  *****************************fav && popular*******************************************              
                    }else if(this.User_id != null && this.typename == undefined && this.typefav != '' && this.popular != ''){
                  this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                           
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            popu : this.popular,
                            fav : this.typefav
                           
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })
                  
     //  *****************************fav && typename*******************************************             
                  }else if(this.User_id != null && this.typename != undefined && this.typefav != '' && this.popular == ''){
                                        this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                            type : this.typename,
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            fav : this.typefav
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })
                
                  }
     //  *************************fav && typename && popular**************************************   
                   else if(this.User_id != null && this.typename != undefined && this.typefav != '' && this.popular != '')   {
                      
                  this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                            type : this.typename,
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            fav : this.typefav,
                            popu : this.popular
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })


                  }else if(this.User_id != null && this.typename != undefined && this.typefav == '' && this.popular != ''){

   this.geolocation.getCurrentPosition().then((resp) => {
                      console.log("resp1" +resp.coords.latitude);
                      this.lat = resp.coords.latitude;
                      console.log("resp2" + resp.coords.longitude);
                      this.long = resp.coords.longitude;
                      var cuisineID = ({
                            type : this.typename,
                            lat : this.lat,
                            long : this.long,
                            uid : this.User_id,
                            popu : this.popular
                        })
                      console.log(cuisineID);
                      console.log(this.common.serializeObj(cuisineID));
                      var serialized_all = this.common.serializeObj(cuisineID);
                      console.log(serialized_all);

                      var url:string = this.variable.baseUrl+this.variable.DEAL_FILTERS;
                      this.http.post(url , serialized_all , this.common.options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.isSuccess == true){
                            this.errorValue = '2';
                            var listing = [];
                            console.log(data);
                        
                          for(var q = 0 ; q < data.msg.length ; q++){
                            console.log(data.msg[q].deals.end_time);
                            this.endtime = data.msg[q].deals.end_time;
                            // listing = data.data[q].Deal;
                              var currentDate = new Date();
                              console.log(currentDate);
                              // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                              // console.log(this.currtym);
                              let hours = currentDate.getHours();
                              console.log("currh->",hours);
                              let min = currentDate.getMinutes();
                              console.log("currm->",min);
                              let sec = currentDate.getSeconds();
                              console.log("currs->",sec);
                              var hh = this.endtime.split(":");
                              console.log("endh->",hh[0]);
                              console.log("endm->",hh[1]);
                              console.log("ends->",hh[2]);
                              console.log("hours->",hh[0] - hours);
                              console.log("min->",hh[1] - min);
                              console.log("sec->",hh[2] - sec);
                              this.thours = hh[0] - hours;
                              this.tmins = Math.abs(hh[1] - min);
                              this.tsec = Math.abs(hh[2] - sec);
                              console.log("hours->",this.thours);
                              console.log(Math.abs(this.tmins));
                              console.log(Math.abs(this.tsec))
                              this.totaltym = this.thours + ' ' + "Hour" + ' ' +this.tmins + ' ' + "Mins" 
                              console.log(this.totaltym);
                              data.msg[q].deals.time = this.totaltym;
                              console.log("finalarr->",data.msg[q].deals.time);
                              console.log(data.msg[q].deals);
                              console.log(data);
                              this.listing = data.msg;
                          }
                     
      }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 2000
        
        });
        toast.present();
      }
      })
    })

                    
                    
                    
                    
                    }else{
         let toast = this.toastCtrl.create({
          message:'No Selection',
          duration: 2000
        
        });
        toast.present();
                }
}






// ************************************************************************************



// ***************************************FAVORITE**************************************
         favorite(ids){
            this.Loading.present();
            this.User_id = localStorage.getItem("USERID");
            this.google_id = localStorage.getItem("GOOGLEUSERID");
            this.User_twid = localStorage.getItem("TWUSERID");
            this.User_fbid = localStorage.getItem("FBUSERID");
           
           if(this.User_id != null){                               
                this.Loading.present();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
                var favodeal = {
                        
                        dealid : ids,
                        userid : this.User_id,
                        status : 1

                }
                  var serialized_favo = this.serializeObj(favodeal); 
                  console.log(serialized_favo);
                  this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
                        this.Loading.dismiss();
                        console.log(datafav);
                        if(datafav.isSuccess == true){

                                console.log(datafav);
                                this.cuisinefilter();
                      
                        }
              })
            }else if(this.google_id != null){
                this.Loading.present();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
                var favodealgoogle = {
                        
                        dealid : ids,
                        userid : this.google_id,
                        status : 1

                }
                  var serialized_favo = this.serializeObj(favodealgoogle); 
                  console.log(serialized_favo);
                  this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
                        this.Loading.dismiss();
                        console.log(datafav);
                        if(datafav.isSuccess == true){

                                console.log(datafav);
                                this.cuisinefilter();
                      
                        }
              })
            }else if(this.User_twid != null){
                this.Loading.present();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
                var favodealtw = {
                        
                        dealid : ids,
                        userid : this.User_twid,
                        status : 1

                }
                  var serialized_favo = this.serializeObj(favodealtw); 
                  console.log(serialized_favo);
                  this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
                        this.Loading.dismiss();
                        console.log(datafav);
                        if(datafav.isSuccess == true){

                                console.log(datafav);
                               this.cuisinefilter();
                      
                        }
              })
            }else if(this.User_fbid != null){
                this.Loading.present();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
                var favodealfb = {
                        
                        dealid : ids,
                        userid : this.User_fbid,
                        status : 1

                }
                  var serialized_favo = this.serializeObj(favodealfb); 
                  console.log(serialized_favo);
                  this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
                        this.Loading.dismiss();
                        console.log(datafav);
                        if(datafav.isSuccess == true){

                                console.log(datafav);
                                this.cuisinefilter();
                      
                        }
              })
              }else{
                        this.Loading.dismiss();
                        this.navCtrl.push(LoginPage,{dealid:ids});
            }

          }


// **********************************************************************************



          dealdetail(id,distance,time){
            console.log('time->',time);
            this.deal_id = id;
            this.navCtrl.push(DetailPage,{dealID : this.deal_id , Dealdistance : distance,Deal_time : time});

          }


// *************************************SEARCH BY NAME**************************************
          setFilteredItems(){
          console.log('Working');
          if(this.name.length == 0) {
                console.log('plz write something');
                this.errorValue = '2'; 
                console.log(this.errorValue);
            } else {

                this.searchList = this.filterItems(this.name);
                console.log('Filtering');
                this.errorValue = '0';
                console.log(this.errorValue);
          }
          }


          public filterItems(searchTerm){
            console.log(searchTerm);
            return this.listing.filter((deallist) => {
              console.log("enter->",deallist);
                return deallist.deals.deal_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });     

          }



// **********************************************************************************************


      map(lat,long){
        localStorage.setItem('deallat',lat);
        localStorage.setItem('deallong',long);
        this.navCtrl.push(MapPage);
      }
  }
