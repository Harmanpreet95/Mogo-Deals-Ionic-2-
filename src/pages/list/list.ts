import { Component } from '@angular/core';
import { NavController, NavParams ,Events} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import { CommonProvider } from '../../providers/common';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    public User_fbid: any = null;
  public User_twid: any = null;
  public google_id: any = null;
  all: any;
  active: any;
  User_id: string;
  public activeid = 0;
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public navCtrl: NavController,public events : Events , public toastCtrl: ToastController,public loadingCtrl:LoadingController,public navParams: NavParams,public common : CommonProvider,public appsetting : Appsetting ,public platform: Platform,public http: Http,public variable: VariableProvider) {

    this.activeid = 0;
    this.User_id = localStorage.getItem("USERID");
    this.list();
    // this.events.subscribe('tab-t0-2', (data)=>{
    //   console.log(data);
    //   console.log(this.navCtrl.canGoBack());
    //   // if(this.navCtrl.canGoBack() == true){
    //   //   this.navCtrl.popToRoot()
    //   // } 
    //  this.list();
      
    //    //alert('working')
    //  }) 
}

list(){


                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");

     if(this.User_id != null){

         var deallistt = ({
 
      uid:this.User_id
   
      })

      console.log(this.common.serializeObj(deallistt));
      var serialized_all = this.common.serializeObj(deallistt);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.active = data.activedeals;
                        console.log(this.active);
                        console.log(this.active.length);
                        if(this.active.length == 0){
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                           this.active = data.activedeals;
                        }
                        // this.all =  data.activealldeals;
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 1000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
      })
    }
    else{
      this.navCtrl.push(LoginPage)
    }
    
}


activeBtn(){

                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
this.activeid = 0;

if(this.User_fbid != null){
       var deallist = ({
 
      uid:this.User_fbid
   
      })

      console.log(this.common.serializeObj(deallist));
      var serialized_all = this.common.serializeObj(deallist);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.active = data.activedeals;
                        console.log(this.active);
                        console.log(this.active.length);
                        if(this.active.length == 0){
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 1000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                           this.active = data.activedeals;
                        }
                        // this.all =  data.activealldeals;
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
      })
}else if(this.User_twid != null){
     var deallist = ({
 
      uid:this.User_twid
   
      })

      console.log(this.common.serializeObj(deallist));
      var serialized_all = this.common.serializeObj(deallist);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.active = data.activedeals;
                        console.log(this.active);
                        console.log(this.active.length);
                        if(this.active.length == 0){
                                     let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                           this.active = data.activedeals;
                        }
                        // this.all =  data.activealldeals;
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
      })
}else if(this.google_id != null){
       var deallist = ({
 
      uid:this.google_id
   
      })

      console.log(this.common.serializeObj(deallist));
      var serialized_all = this.common.serializeObj(deallist);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.active = data.activedeals;
                        console.log(this.active);
                        console.log(this.active.length);
                        if(this.active.length == 0){
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                           this.active = data.activedeals;
                        }
                        // this.all =  data.activealldeals;
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
      })
}else
{
 var deallistt = ({
 
      uid:this.User_id
   
      })

      console.log(this.common.serializeObj(deallistt));
      var serialized_all = this.common.serializeObj(deallistt);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        this.active = data.activedeals;
                        console.log(this.active);
                        console.log(this.active.length);
                        if(this.active.length == 0){
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                           this.active = data.activedeals;
                        }
                        // this.all =  data.activealldeals;
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Active Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
      })
}
}

allBtn(){
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
                    this.activeid=1;

   var deallistt = ({
 
      uid:this.User_id
   
      })

      console.log(this.common.serializeObj(deallistt));
      var serialized_all = this.common.serializeObj(deallistt);
      console.log(serialized_all);

      var url:string = this.variable.baseUrl+this.variable.DEAL_LIST;
      this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
              
      console.log(data);
      this.Loading.dismiss();
      if(data.isSuccess == true){
                       
                        console.log(data);
                        
                        this.all =  data.activealldeals;
                        console.log(this.all);
                        console.log(this.all.length);
                        if(this.all.length == 0){
                                    let toast = this.toastCtrl.create({
                                      message: "No Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
                                    toast.present();
                        }else{
                          this.all =  data.activealldeals;
                        }
                       
                        
                  
      }else{
                                    let toast = this.toastCtrl.create({
                                      message: "No Deals Found!",
                                      duration: 3000,
                                      position:'middle'
                                  
                                    });
        toast.present();
      }
                        
    })

}

  }



