import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VariableProvider {

  // public data1="hello variables";
  public baseUrl: string="http://rakesh.crystalbiltech.com/mogo/api/";
  public SIGNUP_API="users/registration";
  public LOGIN_API="users/login";
  public FORGET_API="users/forgetpwd";
  public FACEBOOK_API = "users/fblogin";
  public SHOWPROFILE_API = "users/showprofile";
  public EDITPROFILE_API = "users/editprofile";
  public SAVEAVATAR_API = "users/saveavatar";
  public DEALLIST_API = "deals/deallisting";
  public CHANGEPASS_API = "users/changepwd";
  public TWITTER_API = "users/twitterlogin";
  public GOOGLE_API =  "users/googlelogin";
  public DEAL_FAVORITES = "deals/dealfavourites";
  public DEAL_DETAIL = "deals/dealdetail";
  public DEAL_LIKE = "deals/deallike";
  public REDEEM_API = "deals/getdeal"; 
  public DEAL_LOCATIONS = "deals/location";
  public DEAL_CITY = "deals/locationfilter";
  public DEAL_LIST = "deals/activealldeal";
  public DEAL_CUISINE = "deals/cuisinelisting";
  public DEAL_FILTERS = "deals/dealfilters";

  public group_id='';
  constructor() {
    //console.log('Hello VariableProvider Provider');
  }
  

}
