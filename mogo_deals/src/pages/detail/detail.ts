import { Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Deal_detailPage } from '../deal_detail/deal_detail';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import { CommonProvider } from '../../providers/common';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {SimpleTimer} from 'ng2-simple-timer';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
@Component({
selector: 'page-detail',
templateUrl: 'detail.html'
})
export class DetailPage {
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
    timer0Id: string;
    timer0button = 'Subscribe';

    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });


     	ngOnInit() {
          this.details();
		this.st.newTimer('1sec',1);
		this.st.newTimer('5sec',5);
		this.st.newTimer('10sec',10);
		
    
	
	} 

  
////////////////////////////////////

constructor(public navCtrl: NavController,public loadingCtrl:LoadingController,public navParams: NavParams,public common : CommonProvider,public appsetting : Appsetting ,public platform: Platform,public http: Http,public variable: VariableProvider,private socialSharing: SocialSharing,private st: SimpleTimer) {
    this.User_id = localStorage.getItem("USERID");
    console.log(this.User_id);
    this.DEAL_ID = this.navParams.get('dealID');
                  this.google_id = localStorage.getItem("GOOGLEUSERID");
                  this.User_twid = localStorage.getItem("TWUSERID");
                  this.User_fbid = localStorage.getItem("FBUSERID");
                  console.log(this.User_fbid);
                  
   

}


get_nxt(){
      if(this.User_id != null || this.google_id != null || this.User_twid != null || this.User_fbid != null){
                  
                    this.navCtrl.push(Deal_detailPage,{DealId : this.DEAL_ID});
      }else{
                this.navCtrl.push(LoginPage);
      }
      
}


details(){
      // alert("detail");
      this.Loading.present();
      this.DEAL_ID = this.navParams.get('dealID');
      console.log(this.common.options);
      this.DEAL_DISTANCE = this.navParams.get('Dealdistance');

      if(this.User_id == null){

           var dealdetailID = ({
            dealid : this.DEAL_ID,
           
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
                          var currentDate = new Date();
                          console.log(currentDate);
                          // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                          // console.log(this.currtym);
                          let hours = currentDate.getHours();
                          console.log("currh->",hours);
                          let min = currentDate.getMinutes();
                          console.log("currm->",min);
                          let sec = currentDate.getSeconds();
                          console.log("currs->",sec)
                          console.log(this.starttym);
                          console.log(this.endtime);
                         var hh = this.endtime.split(":");
                         console.log("endh->",hh[0]);
                         console.log("endm->",hh[1]);
                         console.log("ends->",hh[2]);
                         console.log("hours->",hh[0] - hours);
                         console.log("min->",hh[1] - min);
                         console.log("sec->",hh[2] - sec);

                         this.thours = hh[0] - hours;
                        
                         this.tmins = Math.abs(hh[1] - min);
                        //  alert(this.tmins);
                         this.tsec = Math.abs(hh[2] - sec);
                         console.log("hours->",this.thours);
                         console.log("min->", this.tmins);
                         console.log(Math.abs(this.tmins));
                         console.log("sec->",this.tsec);
                         console.log(Math.abs(this.tsec))
                         
                          var g= 32-31;
                          console.log(g);
                   this.subscribeTimer0();
                          
                        

                
                
                        }else{

                        }
                        
            })

      }else{
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
                          var currentDate = new Date();
                          console.log(currentDate);
                          // this.currtym = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                          // console.log(this.currtym);
                          let hours = currentDate.getHours();
                          console.log("currh->",hours);
                          let min = currentDate.getMinutes();
                          console.log("currm->",min);
                          let sec = currentDate.getSeconds();
                          console.log("currs->",sec)
                          console.log(this.starttym);
                          console.log(this.endtime);
                         var hh = this.endtime.split(":");
                         console.log("endh->",hh[0]);
                         console.log("endm->",hh[1]);
                         console.log("ends->",hh[2]);
                         console.log("hours->",hh[0] - hours);
                         console.log("min->",hh[1] - min);
                         console.log("sec->",hh[2] - sec);

                         this.thours = hh[0] - hours;
                         
                         this.tmins = Math.abs(hh[1] - min);
                        //  alert(this.tmins);
                         this.tsec = Math.abs(hh[2] - sec);
                         console.log("hours->",this.thours);
                         console.log("min->", this.tmins);
                         console.log(Math.abs(this.tmins));
                         console.log("sec->",this.tsec);
                         console.log(Math.abs(this.tsec))
                         
                          var g= 32-31;
                          console.log(g);
                          var countDownDate = new Date(data.data.Deal.end_timedate).getTime();
                          console.log("countdown->",countDownDate);
                          var now = new Date().getTime();
                          console.log("now->",now);
                          var x = setInterval(function() {

                              // Get todays date and time
                              var now = new Date().getTime();
                              
                              // Find the distance between now an the count down date
                              var distance = countDownDate - now;
                              
                              // Time calculations for days, hours, minutes and seconds
                              // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                              
                              // Output the result in an element with id="demo"
                              document.getElementById("demo").innerHTML =  hours + " " +"Hours "
                              + " " + minutes +  " " + "Mins" + " " + seconds + " " +"Sec";
                              
                              // If the count down is over, write some text 
                              if (distance < 0) {
                                    clearInterval(x);
                                    document.getElementById("demo").innerHTML = "EXPIRED";
                              }
                              }, 1000);
                        
                        
                        this.subscribeTimer0();
                
                
                        }else{

                        }
                        
            })
      }
}







//////////////////////////////////TIMER///////////////////////////////
  subscribeTimer0() {
      //   alert("timer");
      //   alert(this.thours);
    this.counter0 =  this.tmins;
//     alert("count->"+this.counter0);
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
      // alert(this.counter0);
      if(this.counter0 == 0 && this.thours == 1){
                  this.subscribeTimer1();
      }else{
           
            if(this.counter0 == 0){
                  // alert("if");
                   this.subscribeTimer1();
            }else{
               this.counter0--;
               this.timer0callback();
            }
      }

	}
	delAllTimer() {
		this.st.delTimer('1sec');
		// this.st.delTimer('5sec');
		// this.st.delTimer('10sec');
	}



       subscribeTimer1() {
             this.st.newTimer('1sec',2);
      //   alert("timer1");
      //   alert(this.thours);
    this.counter0 =  60;
//     alert("count->"+this.counter0);
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
      }else if(this.google_id != null){
             this.Loading.present();
                        var deallike = ({
                        dealid:this.DEAL_ID,
                        userid:this.google_id,
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

      
      }else if(this.User_twid != null){
                        this.Loading.present();
                        var deallike = ({
                              dealid:this.DEAL_ID,
                              userid:this.User_twid,
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
            }else if(this.User_fbid != null){
                        this.Loading.present();
                        var deallike = ({
                              dealid:this.DEAL_ID,
                              userid:this.User_fbid,
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
                  }else{
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



}
 














 /////////////////////////////////Dummy./////////////////////






////////////////////////////////////////////////////////////////////////////////