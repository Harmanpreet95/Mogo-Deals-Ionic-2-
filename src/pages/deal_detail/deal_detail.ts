import { Component } from '@angular/core';
import { NavController , NavParams,ModalController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import { CommonProvider } from '../../providers/common';
import { Platform } from 'ionic-angular';
import { DateFormatter } from "gb-date-formatter";
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
import {RedemodalPage } from '../redemodal/redemodal';

@Component({
  selector: 'page-deal_detail',
  templateUrl: 'deal_detail.html'
})
export class Deal_detailPage {
  chkdismiss: number;
  User_fbid: string;
  User_twid: string;
  google_id: string;
  redeemCodeee: string;
  dealdate: any;
  statuschk: any;
  deal_from: any;
  deal_to: any;
  User_id: string;
  

  public detaildeal = '';
  public detailHotel = '';
  public DEAL_ID = '';
  strDate: Date;
  public redeemID = '';
  public redeemCode = '';
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });


  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public toastCtrl: ToastController,public loadingCtrl:LoadingController,public navParams: NavParams,public common : CommonProvider,public appsetting : Appsetting ,public platform: Platform,public http: Http,public variable: VariableProvider) {
        this.DEAL_ID = this.navParams.get('DealId');
        this.statuschk = this.navParams.get('status');
        
        this.dealdate = this.navParams.get('date_deal');
        console.log(this.dealdate);
        console.log("status",this.statuschk);
        console.log("DEal->",this.DEAL_ID);
        this.redeem();
  }



redeem(){
  
  this.Loading.present();
  this.DEAL_ID = this.navParams.get('DealId');
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
                      this.detaildeal = data.data.Deal;
                      this.deal_from  = data.data.Deal.deal_valid_from;
                      this.deal_to = data.data.Deal.deal_valid_to;
                      this.detailHotel = data.data.Restaurant;
                        // alert("redeem");
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        
                        for (var i = 0; i < 7; i++)
                          text += possible.charAt(Math.floor(Math.random() * possible.length));
                          console.log(text);
                          this.redeemCodeee = text;
                          var currentDate = new Date();
                          console.log(currentDate);
                          this.strDate = currentDate;
                          console.log(this.strDate);
                          this.markRedeem();
                          
                      // return text;
                
    }else{

    }
                      
    })


}


markRedeem(){
  
  this.google_id = localStorage.getItem("GOOGLEUSERID");
  this.User_twid = localStorage.getItem("TWUSERID");
  this.User_fbid = localStorage.getItem("FBUSERID");
  this.User_id = localStorage.getItem("USERID");
  if(this.User_id != null){
  var RedeemId = ({
        uid : this.User_id,
        dealid : this.DEAL_ID,
        deal_code : this.redeemCodeee,
        // redeem_date : this.strDate,
        deal_valid_from : this.deal_from,
        deal_valid_to : this.deal_to,
        deal_valid_date :  this.dealdate
})

console.log(this.common.serializeObj(RedeemId));
var serialized_all = this.common.serializeObj(RedeemId);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_API;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
     console.log(this.redeemCodeee);
     this.redeemCode = this.redeemCodeee;
     this.redeemID = data.data;

    }else{
        console.log(data.already.RedeemDeal.deal_code);
        this.redeemCode = data.already.RedeemDeal.deal_code;
    }
  })
}

  else{
    var RedeemId = ({
        uid : this.User_id,
        dealid : this.DEAL_ID,
        deal_code : this.redeemCodeee,
        // redeem_date : this.strDate,
        deal_valid_from : this.deal_from,
        deal_valid_to : this.deal_to,
        deal_valid_date :  this.dealdate
})

console.log(this.common.serializeObj(RedeemId));
var serialized_all = this.common.serializeObj(RedeemId);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_API;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
     console.log(this.redeemCodeee);
     this.redeemCode = this.redeemCodeee;
     this.redeemID = data.data;

    }else{
        console.log(data.already.RedeemDeal.deal_code);
        this.redeemCode = data.already.RedeemDeal.deal_code;
    }
  })
  }
}



pre_page(){

         this.navCtrl.push(HomePage);
}

mark_modl() {
    let redemodal = this.modalCtrl.create(RedemodalPage,{dealID : this.DEAL_ID});
    redemodal.present();
  }
  dismiss()
{
  this.chkdismiss = 2;
this.navCtrl.push(DetailPage,{dealID : this.DEAL_ID,checkdismiss : this.chkdismiss});
}

}
