import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { VariableProvider } from '../../providers/Variables';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-change_password',
  templateUrl: 'change_password.html'
})
export class Change_passwordPage {
  passwordbit: number;
  User_fbid: string;
  User_twid: string;
  google_id: string;
  User_id: string;
  public data = '';
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public toastCtrl: ToastController,
           public http: Http,
            public variable: VariableProvider) {

  }

changepass(changepassform){
    this.User_id = localStorage.getItem("USERID");
    this.Loading.present();
    console.log(changepassform.value.old);
    console.log(changepassform.value.new);
    console.log(changepassform.value.cfnew);
    if(changepassform.value.new != changepassform.value.cfnew){
      this.Loading.dismiss();
                    let toast = this.toastCtrl.create({
                message: "New Password & Confirm password do not match!",
                duration: 3000
               
              });
              toast.present();
    }else{ 
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
              
                             
                       
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options = new RequestOptions({ headers: headers });
                          var url: string = this.variable.baseUrl + this.variable.CHANGEPASS_API;

                          var logindata = ({

                            old_pwd: changepassform.value.old,
                            new_pwd: changepassform.value.new,
                            uid : this.User_id

                          })
                          //  alert(JSON.stringify(logindata));
                          console.log(logindata);
                          var serialized = this.serializeObj(logindata);
                          this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {
                            this.Loading.dismiss();
                            if (data.isSuccess == true) {
                                  console.log(data);
                                  changepassform.reset();
                                  let toast = this.toastCtrl.create({
                                      message: data.data,
                                      duration: 3000
                                    
                                    });
                                    toast.present();
                            }else{
                                    let toast = this.toastCtrl.create({
                                      message: data.data,
                                      duration: 3000
                                      
                                    });
                                    toast.present();
                            }
                          })
                    }


}


}
