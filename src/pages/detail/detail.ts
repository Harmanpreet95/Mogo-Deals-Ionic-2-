import { Component} from '@angular/core';
import { Nav,NavController,NavParams, AlertController,Events } from 'ionic-angular';
import { Deal_detailPage } from '../deal_detail/deal_detail';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VariableProvider } from '../../providers/Variables';
import { CommonProvider } from '../../providers/common';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';
@Component({
selector: 'page-detail',
templateUrl: 'detail.html'
})
export class DetailPage {
  public x : any;
  public chkdismiss = '';
  cuisinee: any;
  date_valid: any;
      public check_status: any = null;
      like_check: any;
      like_Check: any;
      tsec: number;
  tmins: number;
  thours: number;
  public difference: number;
  public currtym: number;
  public endtime: any;
  public starttym : number;
  startTime: void;
public counterfull =0;
    public deal_time = '';
    public DEAL_ID: any;
    public detaildeal = '';
    public detailHotel = '';
    public User_id : any = null;
  public User_fbid: any = null;
  public User_twid: any = null;
  public google_id: any = null;

    public DEAL_DISTANCE = '';
    public counter0;


    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });




  
////////////////////////////////////

constructor(public navCtrl: NavController,public events : Events,public nav : Nav,public toastCtrl: ToastController,public alertCtrl: AlertController,public loadingCtrl:LoadingController,public navParams: NavParams,public common : CommonProvider,public appsetting : Appsetting ,public platform: Platform,public http: Http,public variable: VariableProvider,private socialSharing: SocialSharing) {
    this.User_id = localStorage.getItem("USERID");
    console.log(this.User_id);
    this.DEAL_ID = this.navParams.get('dealID');
    this.chkdismiss = this.navParams.get('checkdismiss');
    console.log(this.chkdismiss);
                  this.google_id = localStorage.getItem("GOOGLEUSERID");
                  this.User_twid = localStorage.getItem("TWUSERID");
                  this.User_fbid = localStorage.getItem("FBUSERID");
                  console.log(this.User_fbid);
                  this.details();
                   this.x = setInterval(function() {
                        

                            $( ".heading_tme" ).each(function() {
                             var myval =$( this );
                               var countDownDate = new Date($( this ).attr('id')).getTime();
                                console.log("start",countDownDate);
                              //   alert($('input[type=hidden]').val());
                              //   var end_datetime = new Date($('.myhidden').val()).getTime();
                              // //  var end_datetime = new Date($('input[type=hidden]').val()).getTime(); 
                              //   console.log("end",end_datetime);
                              var end_datetime = new Date($(this).parents('li').find('input[type=hidden]').val()).getTime(); 
                              console.log("end",$(this).parents('li').find('input[type=hidden]').val());
                                
                                var now = new Date().getTime();
                                console.log("now",now);
                                var distance = now - countDownDate;
                                var seddistance =  end_datetime -now;
                                console.log("startdiff",distance);
                                console.log("enddiff",seddistance);

                                if (distance >= 0 && seddistance >= 0) {
                                  // this.counterfull = 0;
                                    //   alert("if");
                                  var hours = Math.floor((seddistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                  var minutes = Math.floor((seddistance % (1000 * 60 * 60)) / (1000 * 60));
                                  var seconds = Math.floor((seddistance % (1000 * 60)) / 1000);
                                  $(this).text(hours + " " +"Hours " + " " + minutes +  " " + "Mins" + " " + seconds + " " +"Sec");
                                   // clearInterval(x);
                    
                              }
                              else{
                                // this.counterfull = 1;
                                    // alert("else");
                                        $('.displaynone').hide(); 
                              }
                                console.log(countDownDate);

                            });
                  
                          },1000);
                  this.alreadyredeem();
   
   

}

dismiss()
{
  this.navCtrl.push(HomePage);

}
alreadyredeem(){
  if(this.User_id != null){
      var dealredeem = ({

            dealid : this.DEAL_ID,
            uid : this.User_id
           
      })

      console.log(this.common.serializeObj(dealredeem));
      var serialized_all = this.common.serializeObj(dealredeem);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_REDEEM;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      console.log(data);
      if(data.isSuccess == true){       
            if(this.chkdismiss == undefined){
                  this.check_status = data.redeemstatus;

                   let toast = this.toastCtrl.create({
                        message: "YOU ALREADY REDEEMED THIS DEAL!",
                        duration: 3000,
                        position : 'middle'
                  
                  });
                  toast.present();
            }else{
              console.log("2");
            }

      }else{
            this.check_status = data.redeemstatus;
      }
    })
}

else{
    var dealredeem = ({

            dealid : this.DEAL_ID,
            uid : this.User_id
           
      })

      console.log(this.common.serializeObj(dealredeem));
      var serialized_all = this.common.serializeObj(dealredeem);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_REDEEM;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      console.log(data);
      if(data.isSuccess == true){       

                  this.check_status = data.redeemstatus;

                   let toast = this.toastCtrl.create({
                        message: "YOU ALREADY REDEEMED THIS DEAL!",
                        duration: 3000,
                        position : 'middle'
                  
                  });
                  toast.present();


      }else{
            this.check_status = data.redeemstatus;
      }
    })
  }

}
get_nxt(){
     if(this.User_id != null || this.google_id != null || this.User_twid != null || this.User_fbid != null){
            this.navCtrl.push(Deal_detailPage,{DealId : this.DEAL_ID,status : this.check_status,date_deal : this.date_valid});
 

            }else{
            this.nav.setRoot(LoginPage);
             this.nav.popToRoot();
      }
      
}
details(){


  
      // alert("detail");
      this.Loading.present();
      this.DEAL_ID = this.navParams.get('dealID');
      console.log(this.common.options);
      this.DEAL_DISTANCE = this.navParams.get('Dealdistance');

      if(this.User_id != null){
        // alert("if");
      var deal_detailID = ({
            dealid : this.DEAL_ID,
            uid : this.User_id
      })

      console.log(this.common.serializeObj(deal_detailID));
      var serialized_all = this.common.serializeObj(deal_detailID);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_DETAIL;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      console.log(data);

      
      if(data.isSuccess == true){
                      console.log(data);
                      console.log(data.data.Deal.end_timedate);
                      this.like_check =  data.data.Deal.like;
                      this.detaildeal = data.data.Deal;
                      this.detailHotel = data.data.Restaurant;
                       this.endtime = data.data.Deal.end_time;
                      this.starttym = data.data.Deal.start_time;
                      this.cuisinee = data.data.Restaurant.cuisine;
                      var currentDate = new Date();
                       console.log(currentDate);
                       this.date_valid = data.data.Deal.deal_valid_to;
                       console.log(this.date_valid);
   
                        
                       console.log($('.myhidden').val());
                       



                       
                     
                
                
                        }else{

                        }
                        
            })

      }else{
          // alert("else");
           var dealdetailID = ({
            dealid : this.DEAL_ID
           
      })

      console.log(this.common.serializeObj(dealdetailID));
      var serialized_all = this.common.serializeObj(dealdetailID);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_DETAIL;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      console.log(data);
      if(data.isSuccess == true){
                      console.log(data);
                      this.like_check =  data.data.Deal.like;
                      this.detaildeal = data.data.Deal;
                      this.detailHotel = data.data.Restaurant;
                       this.endtime = data.data.Deal.end_time;
                       this.starttym = data.data.Deal.start_time;
                       this.cuisinee = data.data.Restaurant.cuisine;
                       console.log(data.data.Deal.deal_valid_to);
                       this.date_valid = data.data.Deal.deal_valid_to;
                       console.log(this.date_valid);
                          var currentDate = new Date();
                          console.log(currentDate);
                          // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                          // console.log(this.currtym);
                          console.log($('.myhidden').val());
                      


                
                
                        }else{

                        }
                        
            })

      }
                        
         
      
}




showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Select Quantitiy',
      subTitle: '<ion-grid> <ion-row><ion-col col-6><h3 class="heding_qnty">label</h3></ion-col><ion-col col-6><div class="lst_qnty"><ul><li>+</li><li>1</li><li>-</li></ul></div></ion-col></ion-row></ion-grid>',
      
 inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],

      buttons: ['OK']
    });
    alert.present();
  }



////////////////////////////////TIMER*****END//////////////////////////////////////








like(){
      this.Loading.present();
      this.DEAL_ID = this.navParams.get('dealID');
      console.log(this.common.options);
      this.User_id = localStorage.getItem("USERID");
      this.google_id = localStorage.getItem("GOOGLEUSERID");
      this.User_twid = localStorage.getItem("TWUSERID");
      this.User_fbid = localStorage.getItem("FBUSERID");


      if(this.User_id != null){

      this.Loading.present();
      var deallike = ({
      dealid:this.DEAL_ID,
      userid:this.User_id,
      status:1 
      })

      console.log(this.common.serializeObj(deallike));
      var serialized_all = this.common.serializeObj(deallike);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIKE;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.details();
                        
                  
      }else{

            }
                              
          })
      }
      
                  else{
                        this.Loading.dismiss();
                        this.navCtrl.push(LoginPage);

      }

}




socialshare(message, subject, image, link){

console.log(image);

// this.socialSharing.share(message, subject, null, url).then(() => {
//  alert("success");
// //   // Success!
// }).catch(() => {
// //   // Error!
//   alert("error");
// });
// }


// this.platform.ready().then(() => {
//   // alert("enter");
//             if(window.plugins.socialsharing) {
//                 window.plugins.socialsharing.share(message, subject, image, link);
//             }
//         }).catch((error) => {
// // //   // Error!
//   alert(error);
// });

}

      ionViewWillLeave() {
    clearInterval(this.x);
    console.log("Looks like I'm about to leave :(");
  }

}
 














 