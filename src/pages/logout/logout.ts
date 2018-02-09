import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController) {

  }
  log_nxt(){

          this.navCtrl.push(LoginPage);

      }

}
