import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonProvider {
  

public  options;


public Loader;
  constructor(public loadingCtrl:LoadingController) {
      console.log('Hello CommonProvider Provider');
      this.Loader=this.loadingCtrl.create({
      content: 'Please wait...',
  });
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    this.options= new RequestOptions({ headers: headers });


  }

                    serializeObj(obj){
                    var result = [];
                
                    for (var property in obj)
                    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                    return result.join("&");
                }



}
