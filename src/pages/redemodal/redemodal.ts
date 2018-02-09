import { Component } from '@angular/core';
import { NavController, ViewController, NavParams  } from 'ionic-angular';
import { Deal_detailPage } from '../deal_detail/deal_detail';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import { CommonProvider } from '../../providers/common';


@Component({
  selector: 'page-redemodal',
  templateUrl: 'redemodal.html'
})
export class RedemodalPage {
  User_fbid: string;
  User_twid: string;
  google_id: string;
 
  tick: number;
  User_id: string;
  DEALID: any;
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public navParams: NavParams,public common : CommonProvider,public appsetting : Appsetting ,public http: Http,public loadingCtrl:LoadingController,public variable: VariableProvider) {
     this.DEALID =  this.navParams.get('dealID');
     this.User_id = localStorage.getItem("USERID");
  }
cncl_rede(){
  
  this.navCtrl.pop(Deal_detailPage );
}
redeemDeal(){
  this.User_id = localStorage.getItem("USERID");
  this.google_id = localStorage.getItem("GOOGLEUSERID");
  this.User_twid = localStorage.getItem("TWUSERID");
  this.User_fbid = localStorage.getItem("FBUSERID");

if(this.User_id != null){
  var RedeemMARK = ({
        uid : this.User_id,
        dealid :this.DEALID
        
  })

console.log(this.common.serializeObj(RedeemMARK));
var serialized_all = this.common.serializeObj(RedeemMARK);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_MARK;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: "Marked as Redeemed!",
          duration: 2000,
          position : 'middle'
        
        });
        toast.present();
        this.navCtrl.pop(Deal_detailPage );

     

    }else{
        // let toast = this.toastCtrl.create({
        //   message: data.msg,
        //   duration: 2000
        
        // });
        // toast.present();
    }
    })


}else if(this.google_id != null){
  var RedeemMARK = ({
        uid : this.google_id,
        dealid :this.DEALID
        
  })

console.log(this.common.serializeObj(RedeemMARK));
var serialized_all = this.common.serializeObj(RedeemMARK);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_MARK;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: "Marked as Redeemed!",
          duration: 2000,
          position : 'middle'
        
        });
        toast.present();
        this.navCtrl.pop(Deal_detailPage );

     

    }else{
        // let toast = this.toastCtrl.create({
        //   message: data.msg,
        //   duration: 2000
        
        // });
        // toast.present();
    }
    })
}else if(this.User_twid != null){
    var RedeemMARK = ({
        uid : this.User_twid,
        dealid :this.DEALID
        
  })

console.log(this.common.serializeObj(RedeemMARK));
var serialized_all = this.common.serializeObj(RedeemMARK);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_MARK;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: "Marked as Redeemed!",
          duration: 2000,
          position : 'middle'
        
        });
        toast.present();
        this.navCtrl.pop(Deal_detailPage );

     

    }else{
        // let toast = this.toastCtrl.create({
        //   message: data.msg,
        //   duration: 2000
        
        // });
        // toast.present();
    }
    })

}else if(this.User_fbid != null){
    var RedeemMARK = ({
        uid : this.User_fbid,
        dealid :this.DEALID
        
  })

console.log(this.common.serializeObj(RedeemMARK));
var serialized_all = this.common.serializeObj(RedeemMARK);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_MARK;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: "Marked as Redeemed!",
          duration: 2000,
          position : 'middle'
        
        });
        toast.present();
        this.navCtrl.pop(Deal_detailPage );

     

    }else{
        // let toast = this.toastCtrl.create({
        //   message: data.msg,
        //   duration: 2000
        
        // });
        // toast.present();
    }
    })

}else{
         var RedeemMARK = ({
        uid : this.User_id,
        dealid :this.DEALID
        
  })

console.log(this.common.serializeObj(RedeemMARK));
var serialized_all = this.common.serializeObj(RedeemMARK);
console.log(serialized_all);

    var url:string = this.variable.baseUrl+this.variable.REDEEM_MARK;
    this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    console.log(data);

    if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: "Marked as Redeemed!",
          duration: 2000,
          position : 'middle'
        
        });
        toast.present();
        this.navCtrl.pop(Deal_detailPage );

     

    }else{
        // let toast = this.toastCtrl.create({
        //   message: data.msg,
        //   duration: 2000
        
        // });
        // toast.present();
    }
    })

      }
}
}

