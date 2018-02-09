import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { VariableProvider } from '../../providers/Variables';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-forgot_password',
  templateUrl: 'forgot_password.html'
})
export class  Forgot_passwordPage {
  public data = '';
  serializeObj(obj) {
    var result = [];
    
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController,public toastCtrl : ToastController, public http:Http,public variable: VariableProvider) {

  }
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
    });
   forget(forgetForm){
    this.Loading.present();
    console.log(forgetForm.value.email);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });
    var url:string = this.variable.baseUrl + this.variable.FORGET_API;

        var logindata = {

           username : forgetForm.value.email
            
          };
        console.log(logindata);
        var serialized = this.serializeObj(logindata);
        this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {
        this.Loading.dismiss();
        if(data.isSuccess == true){
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000
        
        });
        toast.present();
        forgetForm.reset();
        this.navCtrl.push(LoginPage);
        }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000
        });
        toast.present();
        }
      });
   }
}
