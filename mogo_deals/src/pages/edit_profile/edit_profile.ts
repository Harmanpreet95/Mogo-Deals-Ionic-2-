import { Component } from '@angular/core';
import {Nav, NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Change_passwordPage } from '../change_password/change_password';
// import {Camera,CameraOptions} from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { VariableProvider } from '../../providers/Variables';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Firebase } from '@ionic-native/firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import 'firebase/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-edit_profile',
  templateUrl: 'edit_profile.html'
})
export class  Edit_profilePage {
  FBUSERID: string;
  google_id: string;
  User_twid: string;
  User_fbid: string;
  profile_image: any;
  srcImage: any;
  public data = '';
  Loading: any;
  User_id: string;

  constructor(public navCtrl: NavController,public nav : Nav,private camera: Camera,public loadingCtrl:LoadingController,public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public appsetting : Appsetting ,public http: Http,public variable: VariableProvider,private twitter: TwitterConnect,   private googlePlus: GooglePlus,  public afAuth: AngularFireAuth,public alertCtrl: AlertController,private facebook: Facebook) {
        this.showProfile();
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
                    this.User_id = localStorage.getItem("USERID");
                    console.log(this.User_id);
  }
                serializeObj(obj){
                    var result = [];
                
                    for (var property in obj)
                    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                    return result.join("&");
                }



openActionSheet(){
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
                    this.User_id = localStorage.getItem("USERID");
                console.log('opening');
                let actionsheet = this.actionSheetCtrl.create({
                title:"Choose Album",
                buttons:[{
                text: 'Camera',
                handler: () => {
                console.log("Camera Clicked");
                  // alert("harman take Picture")
                  const options: CameraOptions = {
                  quality: 8,
                  sourceType : 1,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE
                }
                this.camera.getPicture(options).then((imageData) => {
                  if(this.google_id != null){
                      let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'

                    });
                    Loading.present();
                  // alert(imageData);
                  this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  // alert(this.srcImage);
                  localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                    var data_img = ({
                                uid : this.google_id,
                                img : this.profile_image
                      })
                      // alert("data");
                    // alert(JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                    this.http.post(url, serialized_img, options).map(res=>res.json()).subscribe(data=>{
                          
                  //  alert("img->"+data);
                  //  alert("img->"+JSON.stringify(data));
                  if(data.isSuccess == true){
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }else{
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }

                    })

                  }else if(this.User_twid != null){

                    let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'

                    });
                    Loading.present();
                  // alert(imageData);
                  this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  // alert(this.srcImage);
                  localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                    var data_img = ({
                                uid : this.User_twid,
                                img : this.profile_image
                      })
                      // alert("data");
                    // alert(JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                    this.http.post(url, serialized_img, options).map(res=>res.json()).subscribe(data=>{
                          
                  //  alert("img->"+data);
                  //  alert("img->"+JSON.stringify(data));
                  if(data.isSuccess == true){
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }else{
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }

                    })
                    
                  }else if(this.User_fbid != null){
                      let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'

                    });
                    Loading.present();
                  // alert(imageData);
                  this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  // alert(this.srcImage);
                  localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                    var data_img = ({
                                uid : this.User_fbid,
                                img : this.profile_image
                      })
                      // alert("data");
                    // alert(JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                    this.http.post(url, serialized_img, options).map(res=>res.json()).subscribe(data=>{
                          
                  //  alert("img->"+data);
                  //  alert("img->"+JSON.stringify(data));
                  if(data.isSuccess == true){
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }else{
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }

                    })
                    
                    }else{

                      let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'

                    });
                    Loading.present();
                  // alert(imageData);
                  this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  // alert(this.srcImage);
                  localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                    var data_img = ({
                                uid : this.User_id,
                                img : this.profile_image
                      })
                      // alert("data");
                    // alert(JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                    this.http.post(url, serialized_img, options).map(res=>res.json()).subscribe(data=>{
                          
                  //  alert("img->"+data);
                  //  alert("img->"+JSON.stringify(data));
                  if(data.isSuccess == true){
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }else{
                    Loading.dismiss();
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }

                    })


                  }

                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");
                });
                }
                },{
                text: 'Gallery',
                handler: () => {
                                const options: CameraOptions = {
                                quality: 20,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageUri) => {
         if(this.google_id != null){
                             let Loading = this.loadingCtrl.create({
                                    content: 'Please wait...'

                                  });
                                  Loading.present();
                              // alert(imageUri);
                              this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                              // alert(this.srcImage);
                              localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                                          var datag_img = ({
                                            uid : this.google_id,
                                            img : this.profile_image
                                  })
                              // alert(JSON.stringify(this.profile_image));
                                var serializedg_img = this.serializeObj(datag_img); 
                                console.log(serializedg_img);
                                let headers = new Headers();
                                headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                                let options= new RequestOptions({ headers: headers });
                            
                                var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                                this.http.post(url, serializedg_img, options).map(res=>res.json()).subscribe(data=>{
                                  // alert(data);
                                  // alert(JSON.stringify(data));
                              if(data.isSuccess == true){
                                Loading.dismiss();
                            let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                            }else{
                              Loading.dismiss();
                                let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                              }
                            })
         }else if(this.User_fbid != null){

         let Loading = this.loadingCtrl.create({
                                    content: 'Please wait...'

                                  });
                                  Loading.present();
                              // alert(imageUri);
                              this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                              // alert(this.srcImage);
                              localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                                          var datag_img = ({
                                            uid : this.User_fbid,
                                            img : this.profile_image
                                  })
                              // alert(JSON.stringify(this.profile_image));
                                var serializedg_img = this.serializeObj(datag_img); 
                                console.log(serializedg_img);
                                let headers = new Headers();
                                headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                                let options= new RequestOptions({ headers: headers });
                            
                                var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                                this.http.post(url, serializedg_img, options).map(res=>res.json()).subscribe(data=>{
                                  // alert(data);
                                  // alert(JSON.stringify(data));
                              if(data.isSuccess == true){
                                Loading.dismiss();
                            let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                            }else{
                              Loading.dismiss();
                                let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                              }
                            })

         }   else if(this.User_twid != null){
                  let Loading = this.loadingCtrl.create({
                                    content: 'Please wait...'

                                  });
                                  Loading.present();
                              // alert(imageUri);
                              this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                              // alert(this.srcImage);
                              localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                                          var datag_img = ({
                                            uid : this.User_twid,
                                            img : this.profile_image
                                  })
                              // alert(JSON.stringify(this.profile_image));
                                var serializedg_img = this.serializeObj(datag_img); 
                                console.log(serializedg_img);
                                let headers = new Headers();
                                headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                                let options= new RequestOptions({ headers: headers });
                            
                                var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                                this.http.post(url, serializedg_img, options).map(res=>res.json()).subscribe(data=>{
                                  // alert(data);
                                  // alert(JSON.stringify(data));
                              if(data.isSuccess == true){
                                Loading.dismiss();
                            let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                            }else{
                              Loading.dismiss();
                                let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                              }
                            })
         }else{
          
                                    let Loading = this.loadingCtrl.create({
                                    content: 'Please wait...'

                                  });
                                  Loading.present();
                              // alert(imageUri);
                              this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                              // alert(this.srcImage);
                              localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                                          var datag_img = ({
                                            uid : this.User_id,
                                            img : this.profile_image
                                  })
                              // alert(JSON.stringify(this.profile_image));
                                var serializedg_img = this.serializeObj(datag_img); 
                                console.log(serializedg_img);
                                let headers = new Headers();
                                headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                                let options= new RequestOptions({ headers: headers });
                            
                                var url:string = this.variable.baseUrl+this.variable.SAVEAVATAR_API;
                                this.http.post(url, serializedg_img, options).map(res=>res.json()).subscribe(data=>{
                                  // alert(data);
                                  // alert(JSON.stringify(data));
                              if(data.isSuccess == true){
                                Loading.dismiss();
                            let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                            }else{
                              Loading.dismiss();
                                let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                              }
                            })
         }
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");
                              });
                }
                },
                {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                          //  actionsheet.dismiss()         
                        }
                      }
                    ]
                  });

                  actionsheet.present();
                }





      showProfile(){
  
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_id = localStorage.getItem("USERID");
                    // alert(this.User_id);
                     this.User_fbid = localStorage.getItem("FBUSERID");
                      this.User_twid = localStorage.getItem("TWUSERID");
                    // alert(this.User_fbid);
                    if(this.User_fbid != null){
                      let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'

                    });
                    Loading.present();
                      // alert("if");
                    var data_allfb = ({
                                id : this.User_fbid
                      })
                      // alert(data_allfb);
                      // alert(JSON.stringify(data_allfb));
                    var serialized_all = this.serializeObj(data_allfb); 
                    
                  
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                Loading.dismiss();
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.data = data.data.User;
                        
                         
                          this.srcImage = data.data.User.image;
          
                          console.log(this.srcImage);
                        }else{

                        }
                          

                        
                  })
                    }else if(this.User_twid != null){

                         var data_alltw = ({
                                id : this.User_twid
                      })
                      // alert(data_allfb);
                      // alert(JSON.stringify(data_allfb));
                    var serialized_alltw = this.serializeObj(data_alltw); 
                    
                  
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_alltw, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.data = data.data.User;
                        
                         
                          this.srcImage = data.data.User.image;
          
                          console.log(this.srcImage);
                        }else{

                        }
                          

                        
                  })


                      }else if(this.google_id != null){

                         var data_allgoogle = ({
                                id : this.google_id
                      })
                      // alert(data_allfb);
                      // alert(JSON.stringify(data_allfb));
                    var serialized_allgoogle = this.serializeObj(data_allgoogle); 
                    
                  
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_allgoogle, options).map(res=>res.json()).subscribe(datagoogle=>{
                
                        console.log(datagoogle);
                        if(datagoogle.isSuccess == true){
                          console.log(datagoogle.data.User);
                          console.log(datagoogle.data.User);
                          this.data = datagoogle.data.User;
                        
                         
                          this.srcImage = datagoogle.data.User.image;
          
                          console.log(this.srcImage);
                        }else{

                        }
                          

                        
                  })


                      }else{

                    // alert("fb not null");
                    var data_all = ({
                                id : this.User_id
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    // alert(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.variable.baseUrl+this.variable.SHOWPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                          console.log(data.data.User);
                          console.log(data.data.User);
                          this.data = data.data.User;
                        
                         
                          this.srcImage = data.data.User.image;
          
                          console.log(this.srcImage);
                        }else{

                        }
                          

                        
                  })
                    }
      }

                  editprofile(editform){
                    console.log(editform.value.name);
                    if(editform.value.name == ''){
                       let toast = this.toastCtrl.create({
                                        message: 'Please fill the name!Name cannot be null',
                                        duration: 3000,
                                        position : 'middle',
                                       
                                      });
                                    toast.present();
                    }else if(editform.value.phone == ''){
                        let toast = this.toastCtrl.create({
                                        message: 'Please fill the Phone!Phone cannot be null',
                                        duration: 3000,
                                        position : 'middle'
                                      });
                                    toast.present();
                    }else{
                    this.google_id = localStorage.getItem("GOOGLEUSERID");
                    this.User_twid = localStorage.getItem("TWUSERID");
                    this.User_fbid = localStorage.getItem("FBUSERID");
                    this.User_id = localStorage.getItem("USERID");
                    console.log("uid->",this.User_id);

                    if(this.User_fbid != null){
                      var data_all = ({
                                id : this.User_fbid,
                                name : editform.value.name,
                                phone : editform.value.phone
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                    var url:string = this.variable.baseUrl+this.variable.EDITPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                                     this.showProfile();
                                     let toast = this.toastCtrl.create({
                                        message: data.msg,
                                        duration: 3000
                                      });
                                    toast.present();
                        }else{
                                         let toast = this.toastCtrl.create({
                                          message: data.msg,
                                          duration: 3000
                                        });
                                      toast.present();
                        }


                    })
                  }else if(this.User_twid != null){
                    var data_all = ({
                                id : this.User_twid,
                                name : editform.value.name,
                                phone : editform.value.phone
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                    var url:string = this.variable.baseUrl+this.variable.EDITPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                                    this.showProfile();
                                     let toast = this.toastCtrl.create({
                                        message: data.msg,
                                        duration: 3000
                                      });
                                    toast.present();
                        }else{
                                         let toast = this.toastCtrl.create({
                                          message: data.msg,
                                          duration: 3000
                                        });
                                      toast.present();
                        }


                    })
                  }else if(this.google_id != null){
                    var data_all = ({
                                id : this.google_id,
                                name : editform.value.name,
                                phone : editform.value.phone
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                    var url:string = this.variable.baseUrl+this.variable.EDITPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                                     this.showProfile();
                                     let toast = this.toastCtrl.create({
                                        message: data.msg,
                                        duration: 3000
                                      });
                                    toast.present();
                        }else{
                                         let toast = this.toastCtrl.create({
                                          message: data.msg,
                                          duration: 3000
                                        });
                                      toast.present();
                        }


                    })


                  }
                  
                  else{
                      var data_all = ({
                                id : this.User_id,
                                name : editform.value.name,
                                phone : editform.value.phone
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                    var url:string = this.variable.baseUrl+this.variable.EDITPROFILE_API;
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                
                        console.log(data);
                        if(data.isSuccess == true){
                                    this.showProfile();
                                     let toast = this.toastCtrl.create({
                                        message: data.msg,
                                        duration: 3000
                                      });
                                    toast.present();
                        }else{
                                         let toast = this.toastCtrl.create({
                                          message: data.msg,
                                          duration: 3000
                                        });
                                      toast.present();
                        }


                    })

                  }
                    }
                  }
                  changepass(){
                    this.navCtrl.push(Change_passwordPage);
                  }
                  logout(): firebase.Promise<any>{
                  this.User_twid = localStorage.getItem("TWUSERID");
                  this.google_id = localStorage.getItem("GOOGLEUSERID");
                  var currentuserfb =  localStorage.getItem("USERID");
                  var currentuser =  localStorage.getItem("USER_DATA");
                  this.FBUSERID = localStorage.getItem("FBUSERID");
                let loadings = this.loadingCtrl.create({
                  content: 'Logging Out...'
                });
                loadings.present();
                console.log(currentuser);
                console.log(currentuserfb);
                console.log(this.User_twid);
          if(this.FBUSERID != null){
              return this.afAuth.auth.signOut().then((suc)=>{
                        this.facebook.logout().then((response)=>{
                        loadings.dismiss();
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                  }).catch((error)=>{
                        loadings.dismiss();
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                  })
                }).catch((err)=>{
                        loadings.dismiss();
                        this.facebook.logout().then((response)=>{
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                  }).catch((error)=>{
                        loadings.dismiss();
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                  })
                });
          }else if(this.google_id != null){
          //  alert("google");
          //  alert(localStorage.getItem('GOOGLEUSERID'));
      this.googlePlus.logout().then(function(res){
                      // alert("enter");
                        loadings.dismiss();
                        localStorage.removeItem("GOOGLEUSERID");
                        // alert(localStorage.getItem('GOOGLEUSERID'));
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                        this.nav.popToRoot();
           
              }).catch((error)=>{
                // alert("catch");
                        loadings.dismiss();
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                         this.nav.popToRoot();
                    
                  })



                }else if(this.User_twid != null){
            //  alert(localStorage.getItem('TWUSERID'));
                      this.twitter.logout()
                    .then(function (response) {
                        loadings.dismiss();
                        localStorage.removeItem("TWUSERID");
                        // alert(localStorage.getItem('TWUSERID'));
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                        this.nav.popToRoot();
                    }).catch((error)=>{
                        // alert("catch");
                        loadings.dismiss();
                        localStorage.clear();
                        this.nav.setRoot(LoginPage);
                        this.nav.popToRoot();
                    
                  })
             
                  }else if(currentuser != null){
                        loadings.dismiss();
                        localStorage.clear();
                        console.log(currentuser);
                        this.nav.setRoot(LoginPage);
                        this.nav.popToRoot();


                    }else{
                    //  alert('else');
                      loadings.dismiss();
                      localStorage.clear();
                      console.log(currentuser);
                      localStorage.removeItem('USERID');
                      this.nav.setRoot(LoginPage);
                      this.nav.popToRoot();
          }
}
}
