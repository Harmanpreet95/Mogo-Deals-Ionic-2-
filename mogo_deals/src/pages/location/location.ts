          import { Component } from '@angular/core';
          import { NavController } from 'ionic-angular';
          import { Geolocation } from '@ionic-native/geolocation';
          import {Http, Headers, RequestOptions} from '@angular/http';
          import { Appsetting } from '../../providers/appsetting';
          import {LoadingController} from 'ionic-angular';
          import { ToastController } from 'ionic-angular';
          import { AlertController } from 'ionic-angular';
          import { VariableProvider } from '../../providers/Variables';
          import { CommonProvider } from '../../providers/common';
          import { HomePage } from '../home/home';
          import { FilterLocationPage } from '../filterlocation/filterlocation';
        //   import {googlemaps} from '@ionic-native/google-maps';
        @Component({
        selector: 'page-location',
        templateUrl: 'location.html'
        })
        export class LocationPage {
                lng_add: any;
                lat_add: any;

                ////////////////////Search//////////////
                autocompleteItems: any;
                autocomplete ={ query : '' };
                acService:any;
                placesService: any;

                ///////////////////////////////////////
                locations: any;
                long: number;
                lat: number;
                User_id: string;
                public Loading = this.loadingCtrl.create({
                        content: 'Please wait...'
                        });
        

          constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl:LoadingController,private geolocation: Geolocation,public appsetting : Appsetting ,public http: Http,public common : CommonProvider,public variable: VariableProvider) {
                this.getlocations();
          }

  // ***********************************AUTO-DETECT-LOCATION************************
      autolocation(){
 
                // this.Loading.present();
                // console.log("geo");
                // this.User_id = localStorage.getItem("USERID");
                // console.log(this.User_id);
                // this.geolocation.getCurrentPosition().then((resp) => {
                // console.log("resp1" +resp.coords.latitude);
                // this.lat = resp.coords.latitude;
                // console.log("resp2" + resp.coords.longitude);
                // this.long = resp.coords.longitude;



                // console.log(this.common.options);

                // var CURRENT_LOCATION = ({

                //         lat  : this.lat,
                //         long :  this.long,
              
                //  })

                // console.log(this.common.serializeObj(CURRENT_LOCATION));
                // var serialized_all = this.common.serializeObj(CURRENT_LOCATION);
                // console.log(serialized_all);

                // var url  : string = this.variable.baseUrl + this.variable.DEALLIST_API;
                // this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
                // this.Loading.dismiss();
                // console.log(data);
                // if(data.isSuccess == true){

                        this.navCtrl.push(HomePage);

              //       }else{

              //       }
              //   })
              // })
      }


                
    // ********************************Get localities*************************************
        getlocations(){
                
                var url  : string = this.variable.baseUrl + this.variable.DEAL_LOCATIONS;
                this.http.get(url , this.common.options).map(res=>res.json()).subscribe(data=>{
                this.Loading.dismiss();
                console.log(data);
                if(data.isSuccess == true){

                        this.locations = data.msg;

                    }else{

                    }
                })
        }

    // ************************************************************************************

    //*********************************filter by locations*********************************

        dealbycity(city){

                // alert(city);
                
                this.navCtrl.push(FilterLocationPage,{CITY_NAME : city});

                

        }
//**************************************Search by locality***************************

ngOnInit() {
        // this.acService = new google.maps.places.AutocompleteService(); 
        this.autocompleteItems = [];
        this.autocomplete = {
        query: ''
        };        
        }

        updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
        this.autocompleteItems = [];
        return;
        }
        let self = this; 
        let config = {
        input: this.autocomplete.query, 
        componentRestrictions: {  } 
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
              console.log('modal > getPlacePredictions > status > ', status);
              self.autocompleteItems = [];            
              predictions.forEach(function (prediction) {              
              self.autocompleteItems.push(prediction);
              });
              });
        }

        chooseItem(items){
          console.log(items);
          this.autocomplete.query = items;
          this.autocompleteItems = [];
            
            var link_map : string =  'https://maps.googleapis.com/maps/api/geocode/json?address='+this.autocomplete.query+'&key=AIzaSyAvf6oVVKr4nGZxw69Td8GN4AYCwoufhS0';

              this.http.get(link_map,this.common.options).map(res => res.json()).subscribe(data => {
                          console.log(data);
                          console.log(data.results[0].geometry.location);
                          console.log(data.results[0].geometry.location.lat);
                          this.lat_add  = data.results[0].geometry.location.lat;
                          console.log(data.results[0].geometry.location.lng);
                          this.lng_add =  data.results[0].geometry.location.lng;

                                // var deallike = ({
                                //          lat  : this.lat_add,
                                //          long : this.lng_add
                                // })

                                // console.log(this.common.serializeObj(deallike));
                                // var serialized_all = this.common.serializeObj(deallike);
                                // console.log(serialized_all);

                                // var url:string = this.variable.baseUrl+this.variable.DEAL_LIKE;
                                // this.http.post(url, serialized_all, this.common.options).map(res=>res.json()).subscribe(data=>{
                                        
                                // console.log(data);
                                // this.Loading.dismiss();
                                // if(data.isSuccess == true){
                                                
                                //                         console.log(data);
                                                        
                                                        
                                                
                                // }else{

                                // }
                                                        
                                // })
              })
        }
// ************************************************************************************

}
