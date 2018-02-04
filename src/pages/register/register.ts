import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 
  formRegister: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _formBuilder: FormBuilder) {
        this.formRegister = this._formBuilder.group({
          'name':new FormControl('', [Validators.required]),
          'email':new FormControl('', [Validators.required,Validators.email]),
          'password':new FormControl('', [Validators.required]),
          'passwordV':new FormControl('', [Validators.required])
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
