  import { Component } from '@angular/core';
  import { NavController } from 'ionic-angular';
  
  import {Http, Headers, RequestOptions} from '@angular/http';
  import { Appsetting } from '../../providers/appsetting';
  import {LoadingController} from 'ionic-angular';
  import { ToastController } from 'ionic-angular';
  import { AlertController } from 'ionic-angular';
  import { VariableProvider } from '../../providers/Variables';
  import { CommonProvider } from '../../providers/common';
  import { cuisineFilterPage } from '../cuisineFilter/cuisineFilter';
  import { HomePage } from '../home/home';
  @Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
  })
  export class ModalPage {
    selectedRow: any;
    public favbtn = 0;
    public popbtn = 0;
    public favorite = '';
    public mostpopular = '';
    cuisine_id: string;
    public User_id : any = null;
    public allcuisine = [];
    public cuisine : any = '';
    public Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl:LoadingController,public common : CommonProvider,public appsetting : Appsetting ,public http: Http,public variable: VariableProvider,) {
          this.cuisines();
          this.User_id = localStorage.getItem("USERID");
    }
  dismiss(){

    this.navCtrl.pop(HomePage);
  }
  myfavorite(){
      this.favbtn = 1;
      this.favorite = 'fav';
  }
  popular(){
    this.popbtn = 1;
    this.mostpopular = 'popu';
  }
  cuisinesclick(id,index){

    console.log(index);
    this.selectedRow = index;
    console.log(id);
    this.allcuisine.push(id);
    console.log(this.allcuisine);
    console.log(this.allcuisine.toString());
    var cu = this.allcuisine.toString();
    console.log(cu);
    this.cuisine_id = cu;

    // this.cuisine = this.allcuisine.toString();
    // console.log(this.cuisine);

  }
  cuisines(){
        this.Loading.present();
        console.log(this.common.options);
        

        var url:string = this.variable.baseUrl+this.variable.DEAL_CUISINE;
        this.http.get(url, this.common.options).map(res=>res.json()).subscribe(data=>{
        this.Loading.dismiss();
        console.log(data);
        if(data.isSuccess == true){
                        console.log(data);
                        this.cuisine = data.msg;
        }else{
            let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 2000
          
          });
          toast.present();
        }
        })
  }

  apply(){
      console.log(this.favorite);
    console.log(this.cuisine_id);
    if(this.favorite == '' && this.mostpopular == '' && this.cuisine_id == undefined){
        
        this.navCtrl.push(HomePage);

              
    }else{



    console.log(this.favorite);
    console.log(this.cuisine_id);
    this.navCtrl.push(cuisineFilterPage,{'type' : this.cuisine_id,'myfavorites' : this.favorite,'mypopular':this.mostpopular});
    }  
  }

  }
